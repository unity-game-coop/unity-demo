
// import Sprite from '../base/sprite.js'
import Line from './canvasline.js'

// 棋盘最外层方框的大小
const CHECK_BOARD_SIZE = 300
// 棋盘方框之间的距离
const RECT_DISTANCE = 50

/**
 * 棋盘绘制类
 */
export default class CheckerBoard {
  constructor (ctx) {
    this.ctx = ctx
    this.line = null
    this.init()
  }
  
  /** 
   * 初始化一些绘制棋盘需要的初始数据
   */
  init () {
    let screenHeight = canvas.height
    let screenWidth = canvas.width

    // 计算棋盘基准位置
    this.yTop = (screenHeight - CHECK_BOARD_SIZE) / 2
    this.yBottom = (screenHeight - CHECK_BOARD_SIZE) / 2 + CHECK_BOARD_SIZE
    this.xLeft = (screenWidth - CHECK_BOARD_SIZE) / 2
    this.xRight = (screenWidth - CHECK_BOARD_SIZE) / 2 + CHECK_BOARD_SIZE
  }

  /**
   * 根据坐标绘制棋盘线条
   */ 
  draw (data) {
    this.line = new Line(data, true)
    this.line.drawLineToCanvas(this.ctx)
  }
  
  /**
   * 计算绘制棋盘外层方框所需坐标
   */
  calcOutterCoordinate () {
    // 左上角
    let leftTop = [this.xLeft, this.yTop]
    // 右上角
    let rightTop = [this.xRight, this.yTop]
    // 右下角
    let rightBottom = [this.xRight, this.yBottom]
    // 左下角
    let leftBottom = [this.xLeft, this.yBottom]

    return [leftTop, rightTop, rightBottom, leftBottom, leftTop]
  }

  /**
   * 计算绘制棋盘中层方框所需坐标
   */
  calcMiddleCoordinate () {
    let secondLeftTop = [this.xLeft + RECT_DISTANCE, this.yTop + RECT_DISTANCE]
    let secondRightTop = [this.xRight - RECT_DISTANCE, this.yTop + RECT_DISTANCE]
    let secondRightBottom = [this.xRight - RECT_DISTANCE, this.yBottom - RECT_DISTANCE]
    let secondLeftBottom = [this.xLeft + RECT_DISTANCE, this.yBottom - RECT_DISTANCE]

    return [secondLeftTop, secondRightTop, secondRightBottom, secondLeftBottom, secondLeftTop]
  }

  /**
   * 计算绘制棋盘内层方框所需坐标
   */
  calcInnerCoordinate () {
    const distance = RECT_DISTANCE * 2
    let thirdLeftTop = [this.xLeft + distance, this.yTop + distance]
    let thirdRightTop = [this.xRight - distance, this.yTop + distance]
    let thirdRightBottom = [this.xRight - distance, this.yBottom - distance]
    let thirdLeftBottom = [this.xLeft + distance, this.yBottom - distance]

    return [thirdLeftTop, thirdRightTop, thirdRightBottom, thirdLeftBottom, thirdLeftTop]
  }

  /**
   * 计算外层到内层连线坐标
   */
  calcMiddleLineCoodrinate () {
    // 左
    let startLeftPoint = [this.xLeft, this.yTop + CHECK_BOARD_SIZE / 2]
    let endLeftPoint = [this.xLeft + RECT_DISTANCE * 2, this.yTop + CHECK_BOARD_SIZE / 2]

    // 上
    let startTopPoint = [this.xLeft + CHECK_BOARD_SIZE / 2, this.yTop]
    let endTopPoint = [this.xLeft + CHECK_BOARD_SIZE / 2, this.yTop + RECT_DISTANCE * 2]

    // 右
    let startRightPoint = [this.xRight, this.yTop + CHECK_BOARD_SIZE / 2] 
    let endRightPoint = [this.xRight - RECT_DISTANCE * 2, this.yTop + CHECK_BOARD_SIZE / 2]

    // 下
    let startBottomPoint = [this.xLeft + CHECK_BOARD_SIZE / 2, this.yBottom]
    let endBottomPoint = [this.xLeft + CHECK_BOARD_SIZE / 2, this.yBottom - RECT_DISTANCE * 2]
    
    return [[startLeftPoint, endLeftPoint],
            [startTopPoint, endTopPoint],
            [startRightPoint, endRightPoint],
            [startBottomPoint, endBottomPoint]]
  }

  /**
   * 绘制棋盘到画布
   */
  drawToCanvas () {
    this.draw(this.calcOutterCoordinate())
    this.draw(this.calcMiddleCoordinate())
    this.draw(this.calcInnerCoordinate())
    this.calcMiddleLineCoodrinate().forEach(arr => {
      this.draw(arr)
    })
  }
}
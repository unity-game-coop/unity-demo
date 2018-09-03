
import RadiaGradient from './radialgradient.js'


/**
 * 画布圆形绘制类
 */

export default class Arc {
  /**
   * x:圆心x坐标
   * y:圆心y坐标
   * r:圆半径
   */
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
  }

  drawArcToCanvas(ctx) {
    ctx.beginPath()

    let radiaGradient = new RadiaGradient(ctx, [100, 100, 0, 100, 100, 100], ['#ff0000', '#ff0c0c', '#ff1515', '#ff2020', '#ff2c2c', '#fd3a3a', '#e80101', '#d60000'])
    

    // ctx.strokeStyle = "#b52f2f"
    // ctx.lineWidth = 5
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.stroke()

    ctx.fillStyle = radiaGradient.generate()
    ctx.fill()
  }
}
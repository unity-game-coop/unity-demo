
/**
 * 生成径向渐变类
 */
export default class RadiaGradient {
  /**
   * ctx: 画布上下文
   * coordArr: 径向渐变参数
   * colors: 一个数组，渐变颜色集合
   */
  constructor (ctx, coordArr, colors) {
    this.ctx = ctx
    this.coord = coordArr
    this.colors = colors
  }

  generate () {
    let grd = this.ctx.createRadialGradient(...this.coord);
    let step = 1 / (this.colors.length - 1)
    let base = 0
    this.colors.forEach((color, index) => {
      console.log(index * step)
      grd.addColorStop(index * step, color)
    })

    return grd
  }

}
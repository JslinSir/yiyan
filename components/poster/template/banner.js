 
import baseConfig from './base' 

/**
 * 获取分享配置
 * @param {*} productCode 
 * @param {*} employeeId 
 */
async function GetWxQrcode(shoppeCode, employeeId) {
  
  const wxQrcodeUrl =  'https://image.sce-icm.com/sit/zj-mall/img/20210820/sce-icm-picture-mini-1629445330001.jpg'

  return {  wxQrcodeUrl }
}

/**
 * 海报配置
 * shoppeName 店铺名称
 * shoppeLogo 店铺log
 * productList 商品图片列表
 */
export async function paintPallette(param) {
  const shareConfig = await GetWxQrcode()
  let height = 1110

  const config = [
    // 商品图片
    {
      type: 'image',
      url:param.img,
      css: {
        width: '690rpx',
        height: '400rpx',            
        top: '30rpx',
        left: '30rpx',
        borderRadius: '20rpx',
      }
    },
    // 内容名称
    {
      type: 'text',
      text: param.note,
      css: {
        color: '#323232',
        maxLines: 4,
        width: '640rpx',
        height: '160rpx',
        lineHeight: '38rpx',
        fontSize: '32rpx',
        top: '500rpx',
        left: '58rpx'
      }
    },
   // 内容出自
    {
      type: 'text',
      text:param.content,
      css: {
        color: '#999999',
        width: '640rpx',
        lineHeight: '38rpx',
        fontSize: '32rpx',
        texAligin:'center',
        bottom: '380rpx',
        left: '58rpx'
      }
    },
  
    // 小程序码
    {
      type: 'image',
      url: shareConfig.wxQrcodeUrl,
      css: {
        bottom: '140rpx',
        left: '520rpx',
        width: '160rpx',
        height: '160rpx'
      }
    },
    {
      type: 'text',
      text: '长按识别查看',
      css: {
        bottom: '83rpx',
        left: '510rpx',
        fontSize: '28rpx',
        color: '#999999'
      }
    }
  ]

  return {
    share: {

    },
    // 分享按配置
    btnConfig: {
      // 微信好友
      wxfriends: true,
      // 分享好友不限制
      friendsOpen:false,
      // 分享好友
      friends: false,
      // 分享群
      group: false,
      // 保存海报
      save: true
    },
    config: baseConfig(height, shareConfig.shareHeaderImage, param.shoppeName, param.shoppeLogo, ...config)
  }
}
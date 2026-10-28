# 百炼文档上传中转服务

用于Power Automate流程中，将附件Base64内容自动上传到阿里云百炼，返回可访问的临时公网URL，解决PA原生HTTP无法发送multipart请求的问题。

## 部署方式
1.  Fork本仓库到你的GitHub账号
2.  登录Vercel，导入这个仓库
3.  直接点击Deploy，无需额外环境变量配置
4.  部署完成后得到访问地址：`https://你的域名.vercel.app/api/upload`

## 调用方式
POST请求，JSON Body格式：
```json
{
  "fileName": "test.pdf",
  "fileBase64": "文件的Base64编码字符串",
  "apiKey": "Bearer 你的百炼API密钥"
}
```

成功返回：
```json
{
  "success": true,
  "url": "百炼返回的临时公网文件URL",
  "fileName": "test.pdf"
}
```

## 限制
- 单文件最大支持10MB
- 上传超时30秒

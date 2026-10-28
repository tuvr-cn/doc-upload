import axios from 'axios';
import FormData from 'form-data';

export default async function handler(req, res) {
  // 仅允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { fileName, fileBase64, apiKey } = req.body;

    // 参数校验
    if (!fileName || !fileBase64 || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required parameters: fileName, fileBase64, apiKey' 
      });
    }

    // Base64转Buffer
    const buffer = Buffer.from(fileBase64, 'base64');

    // 构造multipart表单
    const form = new FormData();
    form.append('purpose', 'file-extract');
    form.append('file', buffer, { filename: fileName });

    // 调用百炼文件上传接口
    const uploadRes = await axios.post(
      'https://llm-ia0vqscmeczovnto.cn-beijing.maas.aliyuncs.com/api/v1/files',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': apiKey
        },
        maxContentLength: 10 * 1024 * 1024, // 最大支持10MB文件
        timeout: 30000
      }
    );

    const fileUrl = uploadRes.data.data.uploaded_files[0].url;
    return res.status(200).json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    return res.status(500).json({ 
      success: false, 
      error: error.response?.data?.message || error.message 
    });
  }
}

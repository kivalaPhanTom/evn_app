import { config as dotenvConfig } from 'dotenv'
import fs from 'fs'
import path from 'path'

const envPath = path.resolve('.env')

// Kiểm tra coi thử có file .env hay chưa
if (!fs.existsSync(envPath)) {
  console.log('Không tìm thấy file .env')
  process.exit(1)
}

// Nạp .env
dotenvConfig({ path: envPath })

// Danh sách các biến bắt buộc
const requiredKeys = ['API_URL'] as const

type EnvConfig = {
  API_URL: string
}

// Kiểm tra các biến môi trường có tồn tại và không rỗng
const missing = requiredKeys.filter((k) => {
  const v = (process.env as Record<string, string | undefined>)[k]
  return v === undefined || v === null || String(v).trim() === ''
})

if (missing.length > 0) {
  console.log('Các giá trị khai báo trong file .env không hợp lệ')
  console.error('Thiếu hoặc rỗng các biến môi trường:', missing.join(', '))
  process.exit(1)
}

// Tạo object envConfig với kiểu an toàn
const envConfig: EnvConfig = {
  API_URL: process.env.API_URL!.trim(),
}

export default envConfig

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
  message: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export interface AuthUser {
    id: number
    name: string
    email: string
}
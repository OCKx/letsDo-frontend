export interface OTP {
    otpID?: number;
    userID?: number;
    otp?: string;
    createdAt?: Date;
    expiredAt?: Date;
}
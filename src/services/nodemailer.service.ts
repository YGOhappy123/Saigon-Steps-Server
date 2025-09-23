import nodemailer, { SendMailOptions } from 'nodemailer'
import { readFile } from 'fs/promises'
import { HttpException } from '@/errors/HttpException'
import { parsedEnv } from '@/env'
import path from 'path'
import handlebars from 'handlebars'
import errorMessage from '@/configs/errorMessage'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: parsedEnv.GOOGLE_EMAIL,
        pass: parsedEnv.GOOGLE_APP_PASSWORD
    }
})

const renderTemplate = async (templateName: string, variables: Record<string, any>) => {
    try {
        const templatePath = path.join(process.cwd(), 'src', 'templates', `${templateName}.hbs`)
        const templateFile = await readFile(templatePath, 'utf-8')
        const compiledTemplate = handlebars.compile(templateFile)
        return compiledTemplate(variables)
    } catch (error) {
        throw new HttpException(500, errorMessage.INTERNAL_SERVER_ERROR)
    }
}

const sendEmail = (mailOptions: SendMailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, messageInfo) => {
            if (error) {
                reject(error)
            } else {
                resolve(messageInfo)
            }
        })
    })
}

const nodemailerService = {
    sendResetPasswordMail: async (emailTo: string, name: string, resetPasswordUrl: string) => {
        const title = 'Saigon Steps - Đặt lại mật khẩu'
        const content = await renderTemplate('forgotPassword', {
            title: title,
            name: name,
            resetPasswordUrl: resetPasswordUrl
        })

        const mailOptions = {
            from: parsedEnv.GOOGLE_EMAIL,
            to: emailTo,
            subject: title,
            html: content
        }
        return await sendEmail(mailOptions)
    },

    sendGoogleRegistrationMail: async (emailTo: string, name: string, username: string, password: string, changePasswordUrl: string) => {
        const title = 'Saigon Steps - Đăng ký bằng tài khoản Google'
        const content = await renderTemplate('googleRegistration', {
            title: title,
            name: name,
            username: username,
            password: password,
            changePasswordUrl: changePasswordUrl
        })

        const mailOptions = {
            from: parsedEnv.GOOGLE_EMAIL,
            to: emailTo,
            subject: title,
            html: content
        }
        return await sendEmail(mailOptions)
    },

    sendWelcomeNewStaffMail: async (emailTo: string, name: string, role: string, username: string, password: string, changePasswordUrl: string) => {
        const title = 'Saigon Steps - Chào mừng nhân viên mới'
        const content = await renderTemplate('welcomeStaff', {
            title: title,
            name: name,
            role: role,
            username: username,
            password: password,
            changePasswordUrl: changePasswordUrl
        })

        const mailOptions = {
            from: parsedEnv.GOOGLE_EMAIL,
            to: emailTo,
            subject: title,
            html: content
        }
        return await sendEmail(mailOptions)
    }
}

export default nodemailerService

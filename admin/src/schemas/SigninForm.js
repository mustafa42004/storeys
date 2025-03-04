import * as Yup from 'yup'  // For validation

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password is required')
})

export { validationSchema }
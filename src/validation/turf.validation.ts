import * as Yup from 'yup';


const turfValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobile : Yup.number().required('Mobile number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  location: Yup.string().required('Location is required'),
  gioCoordinates: Yup.string().required('coordinates is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});

export default turfValidationSchema;
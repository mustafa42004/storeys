
const Logo = ({ width, height }) => {
  return (
    <img src='/assets/img/logo.svg' alt="logo" style={{ width: `${width}%` || '100%', height: height || 'auto', objectFit: 'cover' }} />
  )
}

export default Logo
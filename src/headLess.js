import axios from 'axios'

// const t = function () {
//   let i = 0
//   const t = setInterval(() => {
//     if (i > 11) clearInterval(t)
//     console.log(i)
//     i ++
//   }, 400)
// }


module.exports = _t => {
  // t()
  axios.get('http://172.16.0.77:9528/v0-snapshot/iam/iam/common/getCaptcha')
    .then(response => _t(response.data), reject => console.log(reject))
    .catch(err => console.log(err));
  // return Promise.resolve()
}

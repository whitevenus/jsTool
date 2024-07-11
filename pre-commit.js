const process = require('child_process')
const fs = require('fs')

process.exec('git diff HEAD --name-only', (error, stdout) => {
  if (error) throw error
  const needLintFilesArr = stdout.split('\n')
    .filter(item => /\.(js|jsx|vue)$/.test(item))
  // 检查文件是否存在，过滤掉移动和删除的原始文件路径
  const existsFilesPath = needLintFilesArr.filter(filePath => {
    return fs.existsSync(filePath)
  })

  const oldLintCommand = `"node_modules/.bin/eslint" --ext .js,.vue --config .eslintrc.js --ignore-path .eslintignore ${existsFilesPath.join(' ')}`
  console.log(oldLintCommand)
  process.exec(oldLintCommand, (e1, s1) => {
    if (e1) throw s1
  })
})

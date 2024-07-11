'use strict'

const gulp = require('gulp')
const child_process = require('child_process')
const { name } = require('./package.json')
const { F6_RUN_ENV } = process.env

// TIP: 规则为package.json的工程名称去掉 "-" 之后的结果，例如 mobile-view -> mobileview
const projectPath = name.replace(/[-]/g, '')

gulp.task('upload-oss', function () {
  try {
    child_process.exec('rm -rf ossutil.log')
    const buffer = child_process.execSync(`ossutil cp -r dist/ oss://f6-static/${projectPath}/${F6_RUN_ENV} --exclude '*.js.map' -f --loglevel info`, {
      maxBuffer: 5000 * 1024
    })
    console.log('OSS upload success!')
    console.log(buffer)
  } catch (e) {
    throw e
  }
})

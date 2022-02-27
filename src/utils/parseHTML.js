export default function parseHTML(htmlStr) {
  while(/<.+?>/.test(htmlStr)) htmlStr = htmlStr.replace(/<.+?>/, '')
  return htmlStr;
}
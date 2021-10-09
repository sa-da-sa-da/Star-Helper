
function  replace(data){
 return data.replace(/<img/gi, '<img class="img_yl" style="max-width:100%;height:auto;margin: 0 auto;display:block" ')
 .replace(/<code/gi, '<code  class="language-css" ')
 .replace(/<br\/>/g, "\n")
}
module.exports={
  replace
}
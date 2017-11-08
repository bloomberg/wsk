export default function enable (id) {
  var btn = document.getElementById(id);
  var trg = document.getElementById(id + '-target');

  function toggle () {
    var open = this.nodeName === 'DIV' ? this.getAttribute('data-open') === 'true' : true;
    btn.setAttribute('data-open', !open);
    trg.setAttribute('data-open', !open);
  }

  btn.addEventListener('click', toggle);

  var sects = trg.getElementsByTagName('a');

  for (var i = 0; i < sects.length; i++) {
    sects[i].addEventListener('click', toggle);
  }
}

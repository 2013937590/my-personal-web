// 获取弹窗元素
const weixinModal = document.getElementById('weixinModal');
const qqModal = document.getElementById('qqModal');
const closeBtns = document.getElementsByClassName('close');

// 为微信链接添加点击事件
document.querySelector('a[title="wx:xy2013937590"]').addEventListener('click', function (e) {
    e.preventDefault();
    weixinModal.style.display = 'flex';
});

// 为QQ链接添加点击事件
document.querySelector('a[title="QQ:2013937590"]').addEventListener('click', function (e) {
    e.preventDefault();
    qqModal.style.display = 'flex';
});

// 关闭按钮事件
Array.from(closeBtns).forEach(btn => {
    btn.addEventListener('click', function () {
        weixinModal.style.display = 'none';
        qqModal.style.display = 'none';
    });
});

// 点击弹窗外部关闭
window.addEventListener('click', function (e) {
    if (e.target === weixinModal) {
        weixinModal.style.display = 'none';
    }
    if (e.target === qqModal) {
        qqModal.style.display = 'none';
    }
});
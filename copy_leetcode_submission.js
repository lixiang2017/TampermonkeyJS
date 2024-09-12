// ==UserScript==
// @name         Copy Leetcode Submission
// @namespace    http://your-namespace.com
// @version      1.0
// @description  Extract and copy text from elements with 'rounded-sd' class in HTML
// @author       Songlet Li
// @match        https://leetcode.cn/problems/*/submissions/*
// @match        https://leetcode.cn/problems/*/description/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // CSS 样式
    const css = {
        'position': 'absolute',
        'top': '50px',
        'right': '80px',
        'border-radius': '10px',
        'border': '1px solid #ccc',
        'height': '25px',
        'width': '45px',
        'z-index': '999',
        'box-shadow': '1px 2px 3px #ccc',
        'background': '#009688',
        'color': '#fff',
        'font-size': '14px',
        'outline': 'none',
        'box-sizing': 'border-box',
        'cursor': 'move'
    };

    // 创建一个按钮
    const button = document.createElement('button');
    button.innerHTML = 'Copy';

    // 设置按钮样式
    for (let prop in css) {
        button.style[prop] = css[prop];
    }

    document.body.appendChild(button);

    // 拖动按钮功能
    let isDragging = false;
    let offset = {x: 0, y: 0};

    button.addEventListener('mousedown', function(e) {
        isDragging = true;
        offset.x = e.clientX - button.getBoundingClientRect().left;
        offset.y = e.clientY - button.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            button.style.left = (e.clientX - offset.x) + 'px';
            button.style.top = (e.clientY - offset.y) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // 按钮点击事件处理函数
    button.addEventListener('click', function() {
        const elements = document.querySelectorAll('.rounded-sd');

        let textToCopy = '';
        elements.forEach(element => {
            textToCopy += element.textContent.trim() + '\n';
        });

        textToCopy = textToCopy.replaceAll("复杂度分析", "");
        textToCopy = textToCopy.replaceAll("分布", " ");
        textToCopy = textToCopy.replaceAll("ms击败", "ms, 击败 ");
        textToCopy = textToCopy.replaceAll("MB击败", "MB, 击败 ");

        GM_setClipboard(textToCopy);
        console.log('Text copied to clipboard:', textToCopy);
    });
})();

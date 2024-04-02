// ==UserScript==
// @name         1024小助手
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  草榴社区一键下载图片和视频、图片透明、图片隐藏
// @author       Your Name
// @match        https://t66y.com/*
// @match        *://*/htm_data/*
// @match        http*://*/htm_data/*.html
// @match        http*://*/htm_mob/*.html
// @grant        GM_download
// ==/UserScript==

(function () {
  'use strict';

  // 记录主题图片是否透明的状态
  var isTransparent = false;
  // 记录主题图片是否隐藏的状态
  var isHidden = false;
  const IMGLIST = document.querySelectorAll('#conttpc img');
  const VIDEOLIST = document.querySelectorAll('#conttpc video');
  const isDetail = document.querySelector('#conttpc');

  function reloadImageUrls () {
    IMGLIST.forEach(img => {
      img.src = replaceStr(img.src);
    });
    VIDEOLIST.forEach(videoItem => {
      videoItem.src = replaceStr(videoItem.src);
    });
  }
  reloadImageUrls();


  function extractImageUrls () {
    const imageUrls = [];
    // Select all image elements on the page
    const images = IMGLIST;
    images.forEach(img => {
      imageUrls.push(replaceStr(img.src));
    });
    return imageUrls;
  }

  function extractVideoUrls () {
    const videoUrls = [];
    const videos = VIDEOLIST;
    videos.forEach(videoItem => {
      videoUrls.push(replaceStr(videoItem.src));
    });
    return videoUrls;
  }
  function replaceStr (str = "") {
    // https://66img.c1c
    return str?.replace(/\.jpg\.[^/]+\//g, '.jpg.dog/')
      .replace(".ca11tbox.moe", ".catbox.moe")
      .replace(".c111atbox.moe", ".catbox.moe")
      .replace("catbox.m22o1e/", "catbox.moe/")
      .replace("2311img.", "23img.")

      .replace(/\66img\.[^/]+\//g, '66img.cc/')
      .replace("66im6g.", "66img.")
      .replace("666img.", "66img.")
      .replace("663img.", "66img.");
  }


  function batchDownloadImages () {
    const imageUrls = extractImageUrls();
    const videoUrls = extractVideoUrls();
    // Loop through image URLs and download each one
    imageUrls.forEach((url, index) => {
      const name = url.substring(url.lastIndexOf('/') + 1);
      const name2 = `[${index + 1}]` + name;
      GM_download(url, name2);
    });

    videoUrls.forEach((url, index) => {
      const name = url.substring(url.lastIndexOf('/') + 1);
      const name2 = `[${index + 1}]` + name;
      GM_download(url, name2);
    });
  }


  function addDownloadButton () {
    const button = document.createElement('button');
    button.textContent = '图片和视频一键下载';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    button.addEventListener('click', batchDownloadImages);
    document.body.appendChild(button);
  }
  isDetail && addDownloadButton();

  // 添加一个复选框
  function addOpacityButton () {
    // 创建一个容器来放置复选框
    var container = document.createElement('div');
    container.style。position = 'fixed';
    container.style。top = '50px';
    container.style。right = '10px';
    container.style。zIndex = '9999';
    container.style。background = '#fff';
    container.style。padding = '10px';
    document.内容。appendChild(container);

    // 创建复选框1：主题图片透明
    createCheckbox({
      id: 'transparentCheckbox',
      名字: '主题图片透明',
      parObj: container,
    });

    // 创建复选框2：主题图片隐藏
    createCheckbox({
      id: 'hideCheckbox',
      名字: '主题图片隐藏',
      parObj: container,
    });

    // 创建复选框3：纠正错误图片和视频
    createCheckbox({
      id: 'checkCheckbox',
      名字: '修复图片',
      parObj: container,
    });

    // 监听复选框的改变事件
    transparentCheckbox.addEventListener('change', function () {
      if (this。checked) {
        // 选中时的操作
        isTransparent = true;
        applyImageSettings();
      } else {
        // 取消选中时的操作
        isTransparent = false;
        applyImageSettings();
      }
    });

    hideCheckbox.addEventListener('change', function () {
      if (this。checked) {
        // 选中时的操作
        isHidden = true;
        applyImageSettings();
      } else {
        // 取消选中时的操作
        isHidden = false;
        applyImageSettings();
      }
    });

    checkCheckbox.addEventListener('change', function () {
      if (this。checked) {
        // 选中时的操作
        reloadImageUrls();
      } else {
        // 取消选中时的操作

      }
    });

    // 应用图片设置
    function applyImageSettings () {
      [...IMGLIST, ...VIDEOLIST]。forEach(function (img) {
        if (isTransparent) {
          img.style。opacity = '0.1';
        } else {
          img.style。opacity = '1';
        }

        if (isHidden) {
          img.style。display = 'none';
        } else {
          img.style。display = 'block';
        }
      });
    }
  }

  // 创建复选框
  function createCheckbox (props) {
    const { id, 名字, parObj } = props;
    var transparentCheckbox = document.createElement('input');
    transparentCheckbox.类型 = 'checkbox';
    transparentCheckbox.id = id;
    var transparentLabel = document.createElement('label');
    transparentLabel.htmlFor = id;
    transparentLabel.textContent = name;
    var div1 = document.createElement('div');
    div1.appendChild(transparentCheckbox);
    div1.appendChild(transparentLabel);
    parObj.appendChild(div1);
  }

  isDetail && addOpacityButton();

  // 去除头部
  document.querySelector(".banner")。style。display = "none";

})();

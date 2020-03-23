/*!
 * enima-js
 * Animation on scroll
 * 2020 Enzo Vergara
 * MIT License
 * https://github.com/enzoemb/enima
 */
!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.enima=t(e)}("undefined"!=typeof global?global:this.window||this.global,(function(e){"use strict";var t={},a={offset:!1,delay:0,duration:400,once:!0,distance:0};function n(e){e.removeAttribute("data-enima-out"),e.setAttribute("data-enima-in","");let t=e.getAttribute("data-enima-delay");e.style.transitionDelay=t}function r(e){e.removeAttribute("data-enima-in",""),e.setAttribute("data-enima-out","")}return t.init=function(e){console.log("ENIMA INITED"),console.log(a);var t={...a,...e};console.log(t);let o=new IntersectionObserver((e,a)=>{e.forEach(e=>{if(e.isIntersecting){n(e.target);let r=e.target.getAttribute("data-enima-once");1!=t.once&&"true"!==r&&"1"!==r||a.unobserve(e.target)}else r(e.target)})},{rootMargin:"0px 0px 0px 0px"});document.querySelectorAll("[data-enima]:not([data-enima-parent])").forEach(e=>{o.observe(e)});let i=new IntersectionObserver((e,a)=>{e.forEach(e=>{let o=e.target.getAttribute("data-enima-parent-name"),i=document.querySelector(o),c=e.target.querySelectorAll('[data-enima-parent="'+o+'"]');e.isIntersecting?c.forEach(e=>{n(e);let r=e.getAttribute("data-enima-once");1!=t.once&&"true"!==r&&"1"!==r||a.unobserve(i)}):c.forEach(e=>{r(e)})})},{rootMargin:"0px 0px 0px 0px"}),c=[];document.querySelectorAll("[data-enima-parent]").forEach(e=>{c.push(e.getAttribute("data-enima-parent"))}),[...new Set(c)].forEach(e=>{document.querySelector(e).setAttribute("data-enima-parent-name",e),i.observe(document.querySelector(e))})},t}));
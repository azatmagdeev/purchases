import {PurchasesWidget} from "./widget.js";

const widgetEl = document.getElementById('widget');
const statsEl = document.getElementById('stats');
const widget = new PurchasesWidget(widgetEl, statsEl);
console.dir(widget);
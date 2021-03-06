(function($) {
	//全局配置(通常所有页面引用该配置，特殊页面使用mui.init({})来覆盖全局配置)
	$.initGlobal({
		optimize: true,
		swipeBack: true
	});
	var back = $.back;
	var templateWebview = null;
	var subWebview = null;
	var getTemplateWebview = function() {
		if (templateWebview == null) {
			templateWebview = plus.webview.getWebviewById("demoTemplate");
		}
		return templateWebview;
	}
	var getSubWebview = function() {
		if (subWebview == null) {
			subWebview = plus.webview.getWebviewById("template_sub");
		}
		return subWebview;
	}
	$.back = function() {
		var current = plus.webview.currentWebview();
		if (current.id === 'demoTemplate') { //模板主页面
			getTemplateWebview().hide('auto');
			setTimeout(function() {
				document.getElementById("title").className = 'mui-title mui-fadeout';
				getSubWebview().hide("none");
			}, 200);
		} else if (current.id === 'template_sub') {
			getTemplateWebview().evalJS('mui.back();');
		} else {
			back();
		}
	}
})(mui);

/**
 * toggle
 */
window.addEventListener('toggle', function(event) {
	if (event.target.id === 'M_Toggle') {
		var isActive = event.detail.isActive;
		var table = document.querySelector('.mui-table-view');
		var card = document.querySelector('.mui-card');
		if (isActive) {
			card.appendChild(table);
			card.style.display = '';
		} else {
			var content = document.querySelector('.mui-content');
			content.insertBefore(table, card);
			card.style.display = 'none';
		}
	}
});
//简单处理label点击触发radio或checkbox
window.addEventListener('tap', function(event) {
	var target = event.target;
	for (; target && target !== document; target = target.parentNode) {
		if (target.tagName && target.tagName === 'LABEL') {
			var parent = target.parentNode;
			if (parent.classList && (parent.classList.contains('mui-radio') || parent.classList.contains('mui-checkbox'))) {
				var input = parent.querySelector('input');
				if (input) {
					input.click();
				}
			}
		}
	}
});
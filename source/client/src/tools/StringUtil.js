const StringUtil = {

	 Html2Text: (html) => {
		var node = document.createElement('textarea');
		node.innerHTML = html;
		return node.value;
	}
}
export default StringUtil
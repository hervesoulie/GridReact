const Configuration = (() => {

	const WEB_SERVER_EP = 'http://localhost/reactGrid/source/server/service.php'
	const GET_DATA = '?action=getData'
	const NB_ITEMS_PER_PAGE = 15

	return { WEB_SERVER_EP, GET_DATA, NB_ITEMS_PER_PAGE}
})()
export default Configuration

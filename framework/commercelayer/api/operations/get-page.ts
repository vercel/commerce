export type Page = any
export type GetPageResult = { page?: Page }

export type PageVariables = {
  id: number
}

export default function getPageOperation() {
  function getPage(): Promise<GetPageResult> {
    return Promise.resolve({
      page: {
        body: `<script>location.href = '/api/checkout/?orderId=' + localStorage.getItem('CL_ORDER_ID') + '&accessToken=' + document.cookie</script>`,
      },
    })
  }
  return getPage
}

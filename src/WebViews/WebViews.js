

module.exports=[
    {name:"ServiceSite"},
    {
        name:"BottomSheet",
        asModal:true,
        modalStyle:{height:0.7},
    },
].map((webview,i)=>({
    ...webview,
    id:webview.name.toLowerCase(),
    statusBarColor:globalThis.backgroundColor,
    backgroundColor:globalThis.backgroundColor,
    file:`index${i+1}.html`,
}));

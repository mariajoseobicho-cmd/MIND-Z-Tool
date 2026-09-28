export interface BrowserAppProfile{id:string;label:string;baseUrl:string;capabilities:string[];loginRequired:boolean;notes?:string;}
export const browserAppProfiles:BrowserAppProfile[]=[
{id:"gemini-web",label:"Gemini Web",baseUrl:"https://gemini.google.com/",capabilities:["browser.ask","browser.compare","browser.multimodal-review"],loginRequired:true,notes:"Use an authorized user browser profile; do not bypass quotas, CAPTCHAs or access controls."},
{id:"youtube-web",label:"YouTube",baseUrl:"https://www.youtube.com/",capabilities:["browser.research","browser.extract"],loginRequired:false},
{id:"huggingface-web",label:"Hugging Face",baseUrl:"https://huggingface.co/",capabilities:["browser.research","browser.extract"],loginRequired:false}
];
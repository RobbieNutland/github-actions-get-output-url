"use strict";

console.log("RN Workflow starting.");

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const url = __importStar(require("url"));
const { http, https } = __importStar(require("follow-redirects"));
const {App} = __importStar(require("@octokit/app"));
const {createTokenAuth} = __importStar(require("@octokit/auth-token"));

function run() {
    return __awaiter(this, void 0, void 0, async function* () {
        try {
            const token = core.getInput('TOKEN');
            const owner = core.getInput('OWNER');
            const repo = core.getInput('REPO');
            const workflow_id = core.getInput('WORKFLOW_ID');
            const ref = core.getInput('REF');
            const inputs = core.getInput('INPUTS');
            const job_index = core.getInput('JOB_INDEX');
            var runs_response;
            var run_resource;
            var run_userID;
            var wf_found = 0;
            var jobs_response;


            console.log("RN Function starting.");

            const auth = createTokenAuth(token);
            const authentication = await auth();


            // const app = new App({
            //     appId: core.getInput('APP_ID'),
            //     privateKey: core.getInput('APP_PRIVATEKEY'),
            // });

            // const octokit = await app.getInstallationOctokit(core.getInput('INSTALLATION_ID'));
            // const { token } = await octokit.auth({ type: "installation" });


            console.log('RN auth setup.')

            const requestWithAuth = request.defaults({
                ref: ref,
                inputs: inputs,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                request: {
                    hook: auth.hook,
                }
            });

            const { data: authorizations } = await requestWithAuth(`POST /repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`);


            console.log('RN POST request sent');

            // // Execute workflow.
            // await octokit.request(`POST /repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`, {
            //     ref: ref,
            //     inputs: inputs,
            //     headers: {
            //         'X-GitHub-Api-Version': '2022-11-28'
            //     }
            // });

            // async function myFunction(){
            //     runs_response = await octokit.request(`GET /repos/${owner}/${repo}/actions/runs`, {
            //         headers: {
            //             'X-GitHub-Api-Version': '2022-11-28'
            //         }
            //     });
            // }

            // // Loop six times.
            // for (var l = 0; l < 6; l++) {
            //     for (var i = 0; i < runs_response.data.workflow_runs.length; i++) { 
            //         run_resource = runs_response.data.workflow_runs[i].name.replace(/^Retrieve '(.*)',.*$/, "$1");
            //         run_userID = runs_response.data.workflow_runs[i].name.replace(/^.*requested by (.*)\.$/, "$1");
                    
            //         if (run_resource == core.getInput('INPUTS').resource || run_userID == core.getInput('INPUTS').userID){
            //             wf_found = 1;
                        
            //             // Lists the workflow run's jobs:
            //             jobs_response = await octokit.request(`GET /repos/${owner}/${repo}/actions/runs/{run_id}/jobs`, {
            //                 run_id: runs_response.data.workflow_runs[i].id,
            //                 headers: {
            //                     'X-GitHub-Api-Version': '2022-11-28'
            //                 }
            //             });

            //             job_id = jobs_response.data.jobs[job_index].id;
            //             redirect_response = await octokit.request(`GET /repos/${owner}/${repo}/actions/jobs/${job_id}/logs`, {
            //                 headers: {
            //                     'X-GitHub-Api-Version': '2022-11-28',
            //                 }
            //             });

            //             const options = url.parse(`https://api.github.com/repos/${owner}/${repo}/actions/jobs/${job_id}/logs`);
            //             options.maxRedirects = 0;
            //             options.method = "get";
            //             options.headers = {
            //                 'X-GitHub-Api-Version': '2022-11-28',
            //                 'Authorization': token,
            //                 'Accept': 'application/vnd.github.v3+json'
            //             }
            //             options.beforeRedirect = function (options, response, request) {
            //                 core.setOutput('url', response.headers["Location"]);
            //                 //options.headers = {};
            //             };
            //             https.request(options);

            //             break;
            //         }
            //     }

            //     if (wf_found) {
            //         break;
            //     }

            //     // Wait 5 seconds before re-calling the function. Timeout after 30 seconds (6 * 5 seconds);
            //     setTimeout(myFunction, 5000);
            // }

            // if (!wf_found){
            //     throw "Error: A workflow matching the specified resource and userID was not found.";
            // };

        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();

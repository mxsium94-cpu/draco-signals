# DRACO SIGNALS — Free Hosting Starter

## কোন Hosting?
Cloudflare Workers + Static Assets-এর Free plan দিয়ে এই starter deploy করা যায়। Free Workers-এ বর্তমানে দৈনিক 100,000 request এবং প্রতি request-এ 10 ms CPU limit আছে। সীমা ও শর্ত বদলাতে পারে; ব্যবহারের আগে অফিসিয়াল ডকুমেন্টেশন দেখুন:
https://developers.cloudflare.com/workers/platform/limits/

## গুরুত্বপূর্ণ সীমাবদ্ধতা
- এটি deploy-ready starter, সম্পূর্ণ live trading signal integration নয়।
- QUANTEX-এর সঠিক API endpoint, authentication format, request parameters এবং response schema যাচাই করা হয়নি।
- তাই `/api/signal` ইচ্ছাকৃতভাবে live CALL/PUT দেয় না; ভুয়া signal বা win-rate দেখায় না।
- OTC ডেটা provider সত্যিই সরবরাহ করে কি না এবং আপনার paid plan-এ অন্তর্ভুক্ত কি না, provider-এর লিখিত documentation দিয়ে নিশ্চিত করতে হবে।
- এটি broker-এ trade place করে না। কোনো profit/accuracy guarantee নেই।

## Deploy (কম্পিউটার থাকলে সহজ)
1. https://dash.cloudflare.com/ এ account খুলুন।
2. কম্পিউটারে Node.js LTS ইনস্টল করুন: https://nodejs.org/
3. এই ZIP extract করুন।
4. Terminal-এ project folder খুলে চালান:
   `npm install -g wrangler`
   `wrangler login`
   `wrangler deploy`
5. Deploy হলে Cloudflare একটি `workers.dev` URL দেবে।

## Secret যোগ করা
QUANTEX-এর API key browser/HTML-এ দেবেন না। Official API docs যাচাইয়ের পর:
`wrangler secret put QUANTEX_API_KEY`
এবং
`wrangler secret put QUANTEX_API_BASE`
চালিয়ে secret সেট করতে হবে। `QUANTEX_API_BASE`-এ provider-এর official API base URL দিতে হবে, dashboard page URL নয়।

## Live API adapter সম্পূর্ণ করতে যা লাগবে
Provider-এর official API documentation থেকে:
- Base URL
- Signal endpoint path
- Authentication header format
- Required query/body parameters
- Example successful response JSON
- OTC/Real market field values
এসব দিয়ে `src/index.js`-এ adapter implement ও test করতে হবে। API key বা password শেয়ার করবেন না।

## API route
- `GET /api/health` — app ও secret configured কিনা জানায় (secret প্রকাশ করে না)
- `GET /api/signal` — adapter না হওয়া পর্যন্ত 501/503 দেয়

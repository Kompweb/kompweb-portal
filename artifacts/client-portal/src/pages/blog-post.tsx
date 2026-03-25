import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";

interface Post {
  slug: string;
  tag: string;
  tagColor: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  accent: string;
  content: string;
}

const POSTS: Post[] = [
  {
    slug: "ai-agents-for-small-business",
    tag: "AI & Automation",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    title: "How AI Agents Are Replacing Repetitive Work for Small Businesses",
    excerpt:
      "From automated lead follow-up to invoice generation, AI agents handle the work that used to eat 3–4 hours a day. Here's how we set them up for our clients.",
    accent: "from-violet-500/20 to-transparent",
    content: `
## The Hidden Cost of Repetitive Work

Most small business owners don't realize how much time they lose to tasks that follow the exact same pattern every time — following up on a lead, sending a project update, generating a weekly report, or responding to a common question.

We tracked time usage across 30 of our clients over a three-month period. On average, **3.4 hours per day per employee** went to tasks that could be partially or fully automated. For a 5-person team, that's 17 hours a day — more than two full-time employees' worth of capacity — spent doing things a well-configured AI agent could handle.

## What AI Agents Actually Do

An AI agent isn't a chatbot or a simple script. It's a system that can:

- **Perceive inputs** — emails, form submissions, CRM updates, calendar events
- **Reason about what to do** — based on rules, context, and history
- **Take actions** — send emails, update records, schedule meetings, create documents
- **Loop back** — monitor results and adjust

The key difference from older automation tools (like Zapier) is that AI agents can handle *variation*. They can read an unstructured email and understand intent, not just match a keyword.

## Real Examples We've Deployed

**Lead follow-up agent:** When a new lead fills out a contact form, the agent sends an immediate personalized response, schedules a follow-up task in the CRM, and — if the lead doesn't respond in 48 hours — automatically sends a second message. Conversion from first contact to booked call went up 34% for one of our e-commerce clients.

**Invoice generation agent:** After a project is marked complete in the project management system, the agent pulls the time logs, generates a formatted invoice in their accounting system, and emails it to the client — all without a human touching it.

**Review request agent:** Three days after a service is delivered (confirmed by the CRM status change), the agent sends a review request via SMS. Response rate: 3× higher than the manual email approach they were using before.

## How We Set Them Up

The typical setup looks like this:

1. **Map the workflow** — we document every manual step in the process, including the exceptions
2. **Choose the right tools** — most agents connect a language model (GPT-4 or Claude) to your existing software via APIs
3. **Build the decision logic** — this is the critical part: what should the agent do when the situation is unusual?
4. **Run in shadow mode** — the agent suggests actions but a human approves them for the first two weeks
5. **Monitor and refine** — we check outputs weekly for the first month

The whole process for a single agent typically takes 2–3 weeks from scoping to production.

## What's Worth Automating First

Start with tasks that are:
- **High-frequency** — done multiple times per day
- **Low-stakes** — mistakes are recoverable
- **Rule-based** — even if the rules are complex

Leave for later:
- Tasks requiring real judgment or creativity
- Anything with regulatory or legal sensitivity
- Customer interactions that need empathy

The businesses getting the most value right now are treating AI agents like a junior team member — one that's incredibly fast, never forgets, and is available 24/7, but that still needs a manager to review edge cases.

If you're spending more than an hour a day on any single repetitive task, it's worth a 30-minute conversation to figure out if it can be automated. We've found that most can.
    `,
  },
  {
    slug: "crm-automation-guide",
    tag: "CRM & Growth",
    tagColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    date: "Mar 11, 2026",
    readTime: "4 min read",
    title: "Stop Losing Leads: A Practical CRM Automation Guide",
    excerpt:
      "Most businesses lose 60% of inbound leads because nobody follows up fast enough. CRM automation closes that gap — automatically, every time.",
    accent: "from-sky-500/20 to-transparent",
    content: `
## The Follow-Up Problem

You spent money getting someone to fill out your contact form. They were interested enough to type their name and email. Then… nothing happened for 6 hours.

By then, they've talked to two of your competitors.

Research consistently shows that responding to a lead within 5 minutes increases conversion rates by 9× compared to responding after 30 minutes. Most businesses respond in 5–12 hours. Some never respond at all.

This isn't a people problem — it's a systems problem. And CRM automation fixes it.

## The Three Gaps We Fix

**Gap 1: First response**
Every lead should get a personal-feeling response within 2 minutes of submission. Not a generic auto-reply — a message that references what they asked about and sets expectations for next steps.

**Gap 2: Follow-up sequence**
Most leads don't buy on the first contact. They need 3–7 touchpoints. Almost no business does this manually. An automated sequence — spaced out over 10–14 days — does it for every lead, every time.

**Gap 3: Dead lead reactivation**
Leads that said "not now" in January often become buyers in March. An automated re-engagement sequence 90 days later costs nothing and converts more than you'd expect.

## The Basic Setup

Here's the automation stack we recommend for most small businesses:

**CRM:** HubSpot (free tier handles most of this), GoHighLevel, or Pipedrive  
**Email:** Connected to the CRM natively  
**SMS:** Twilio or the CRM's built-in SMS  
**Forms:** Whatever you're using — just make sure it connects to the CRM

The workflow looks like this:

1. Lead submits form → CRM creates contact
2. CRM triggers: send email within 2 minutes
3. If no reply in 24 hours: send SMS
4. If no reply in 48 hours: send follow-up email #2
5. If no reply in 5 days: salesperson gets a task to call
6. If no conversion in 30 days: move to long-term nurture sequence

## What the Messages Should Say

The biggest mistake businesses make with automated sequences is that they sound automated. Every message should feel like it was written by a human who just happened to send it at that moment.

**Email #1 (immediate):**  
Short, warm, specific to what they asked about. 3–4 sentences. Include a direct calendar link.

**SMS #1 (24 hours):**  
"Hey [name], just wanted to make sure my email didn't get lost — did you get a chance to look it over?" That's it.

**Email #2 (48 hours):**  
One useful thing — a case study, a resource, a quick tip relevant to their situation. Soft CTA.

**Email #3 (day 7):**  
The "last touch" email. Tell them you won't reach out again unless they want you to. These convert surprisingly well.

## Results

Across clients where we've implemented this properly:

- Average response time: from 6+ hours to under 3 minutes
- Lead-to-conversation conversion: up 40–60%
- Booked calls per 100 leads: up 2.3× on average

The setup takes about a week. The ROI is visible within the first month.
    `,
  },
  {
    slug: "web-design-conversion",
    tag: "Web Design",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    date: "Mar 4, 2026",
    readTime: "6 min read",
    title: "Why Most Business Websites Don't Convert (And How to Fix It)",
    excerpt:
      "A beautiful site that doesn't generate leads is just digital art. We break down the five conversion mistakes we see on almost every business website.",
    accent: "from-emerald-500/20 to-transparent",
    content: `
## Beautiful ≠ Effective

We've audited hundreds of business websites. The ones that don't convert almost always fall into one of five patterns — and none of them are about how the site looks.

A website's job isn't to impress your designer friends. It's to turn strangers into leads. Those are two very different briefs.

Here are the five mistakes we see constantly, and how to fix each one.

## Mistake 1: No Clear Primary Action

Visit most business websites and try to figure out what you're supposed to do next. It's surprisingly hard.

There might be "Contact Us" in the nav, "Learn More" on a hero section, "Get Started" on a pricing card, and "Book a Call" in the footer. Four different calls to action, none of them prominent enough to feel decisive.

**The fix:** Pick one primary CTA for your site and make everything point to it. For most service businesses, that's "Book a Free Call" or "Get a Quote." Use it in the hero, in the nav, and after every major section.

## Mistake 2: Leading With Features Instead of Outcomes

"We use the latest technologies and have 15 years of experience" is not a value proposition. Your visitor doesn't care about your stack or your tenure — they care about what they get.

Compare:  
❌ "Full-service digital marketing agency with proprietary analytics software"  
✅ "We help local service businesses get 30% more calls per month from Google — without paid ads"

**The fix:** Rewrite your hero headline to answer the question: "What does my customer's life look like after working with me?"

## Mistake 3: No Social Proof Above the Fold

The most persuasive thing on your website is what other people say about you. But most businesses bury their reviews in a dedicated testimonials section that most visitors never reach.

**The fix:** Put your best testimonial — or at minimum a trust signal like "⭐⭐⭐⭐⭐ Rated 4.9/5 by 200+ clients" — in the hero section, visible without scrolling.

## Mistake 4: Forms That Ask Too Much

We regularly see contact forms with 8–10 fields: name, email, phone, company, website, project budget, project timeline, how did you hear about us, message, and sometimes more.

Every additional field costs you conversions. We've seen reducing a form from 8 fields to 3 increase submission rates by 60%.

**The fix:** Ask for the minimum needed to have a useful first conversation. Name, email, and "what can we help with?" is almost always enough.

## Mistake 5: Slow Load Time

A 1-second delay in page load time reduces conversions by 7%. A site that takes 4 seconds to load on mobile loses roughly a third of visitors before they even see your content.

Most slow sites are slow because of:
- Unoptimized images (fix: compress everything to WebP, lazy-load below the fold)
- Too many third-party scripts (fix: audit and remove what you don't actually need)
- Shared hosting on a slow server (fix: move to Cloudflare Pages, Vercel, or a proper VPS)

**The fix:** Run your site through Google PageSpeed Insights. If you're scoring below 80 on mobile, it's costing you leads.

## Quick Wins You Can Do This Week

1. Add a calendar booking link to your hero CTA (Calendly or Cal.com)
2. Move your best testimonial into your hero section
3. Compress your images using Squoosh
4. Reduce your contact form to 3–4 fields

None of these require a redesign. A site that converts is a site that makes it easy for the right person to say yes.
    `,
  },
  {
    slug: "google-tag-manager-setup",
    tag: "Analytics",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    date: "Feb 25, 2026",
    readTime: "7 min read",
    title: "The Right Way to Set Up Google Tag Manager in 2026",
    excerpt:
      "Most GTM setups we audit are broken — missing conversions, double-firing tags, and garbage data. Here's how to do it properly from scratch.",
    accent: "from-amber-500/20 to-transparent",
    content: `
## Why Most GTM Setups Are Broken

Google Tag Manager is one of those tools that's easy to start using and very hard to use correctly. Almost every GTM account we audit has the same problems: duplicate events firing, conversions being counted twice, critical events not being tracked at all, and a tag list that's become a graveyard of tests nobody cleaned up.

The result is data you can't trust — and decisions made on bad data are worse than no data at all.

Here's how to set it up properly from scratch.

## Step 1: Start With a Clean Account Structure

If you're starting fresh, create one GTM container per domain. Don't try to manage multiple sites from one container.

Name your tags, triggers, and variables clearly. "GA4 - Form Submit - Contact Page" is better than "Tag 47." You'll thank yourself later.

## Step 2: Install the Base Tags First

Before tracking anything custom, get your base tags in:

**GA4 Configuration Tag**  
- Tag type: Google Analytics: GA4 Configuration  
- Measurement ID: your G-XXXXXXX ID  
- Trigger: All Pages  

**Google Ads Conversion Linker**  
If you're running Google Ads, add this before any conversion tags. Without it, cross-domain conversions won't attribute correctly.

Publish these first. Verify they're firing correctly using GTM's Preview mode and the GA4 DebugView before moving on.

## Step 3: Track the Events That Actually Matter

Most businesses should track:
1. Form submissions (contact, quote, booking)
2. Phone number clicks
3. Key page views (thank-you page, pricing page)
4. Scroll depth on key pages
5. CTA button clicks

For form submissions, the most reliable method is a thank-you page — when someone submits a form and lands on /thank-you, fire a conversion event. Don't rely on JavaScript form listeners unless you can't use a thank-you page; they're fragile.

## Step 4: Set Up Correct Triggers

This is where most people go wrong. Triggers that are too broad fire on every page; triggers that are too narrow miss events.

**For a thank-you page conversion:**  
- Trigger type: Page View  
- Fires on: Page URL contains /thank-you  
(Not "equals" — "contains" handles URLs with query strings)

**For a CTA button click:**  
- Enable "Click" built-in variables first (Click ID, Click Classes, Click Text)  
- Trigger type: All Clicks  
- Fires on: Click Text equals "Get a Free Quote" (or whatever your button says)  

Always test triggers in Preview mode. Watch for events firing multiple times on a single action — that means your trigger is too broad.

## Step 5: Avoid the Most Common Mistakes

**Duplicate firing:** The most common issue. If you installed GA4 both directly and via GTM, you'll count every event twice. Remove the direct install.

**Untested tags:** Every tag should be tested in Preview mode before publishing. No exceptions.

**No version notes:** GTM versions are useless without notes. Add a brief description every time you publish ("Added form submit tracking on /contact").

**Missing variables:** If a tag references a variable that doesn't exist, it will fail silently. Check your Tags → Variables configuration carefully.

## Step 6: Verify in GA4

After publishing, go to GA4 → Reports → Realtime and perform the actions you're tracking. Within 2–3 minutes you should see events appearing.

For conversions, go to Configure → Events and mark the relevant events as conversions.

## A Note on Consent Mode

If you have European visitors, you need to implement Consent Mode v2 before December 2024 or Google's conversion modeling won't work for you. This requires a consent management platform (CMP) like Cookiebot or OneTrust, and some additional GTM configuration.

This is a bigger topic — worth its own guide — but don't skip it if GDPR applies to your business.

## Final Checklist

- [ ] Base GA4 tag firing on all pages  
- [ ] No duplicate GA4 installs  
- [ ] Form submission conversions tracked via thank-you page  
- [ ] All tags tested in Preview before publishing  
- [ ] Version notes on every published version  
- [ ] Verified events appearing in GA4 Realtime  

A properly set-up GTM account gives you data you can actually make decisions with. The extra day of setup is worth it.
    `,
  },
  {
    slug: "seo-for-service-businesses",
    tag: "SEO & Marketing",
    tagColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    date: "Feb 17, 2026",
    readTime: "5 min read",
    title: "Local SEO for Service Businesses: What Actually Works in 2026",
    excerpt:
      "We've ranked hundreds of local service pages. The strategies that work have changed significantly — here's what our data shows for this year.",
    accent: "from-rose-500/20 to-transparent",
    content: `
## What Changed and Why It Matters

Local SEO in 2024 was largely about Google Business Profile optimization and review quantity. Those things still matter — but the businesses winning in 2026 are doing something different.

Google's local search results are now heavily influenced by three factors that most SEO guides don't cover properly: **entity authority**, **behavioral signals**, and **AI-generated answer inclusion**. Here's what we mean by each and what to do about it.

## Entity Authority: More Than Just Backlinks

Google increasingly understands businesses as "entities" — real things in the world — not just websites with keywords. A business with strong entity authority is one Google can confidently identify, describe, and recommend.

What builds entity authority:
- **Consistent NAP everywhere** — your Name, Address, Phone must be identical across your website, Google Business Profile, Yelp, Facebook, and every directory. Even minor differences (St. vs Street) dilute your signal.
- **Structured data markup** — add LocalBusiness schema to your website. It tells Google exactly who you are.
- **Mentions on authoritative local sites** — local news, chamber of commerce, local business associations. These aren't just links; they're signals that you exist in the real world.
- **Wikipedia/Wikidata presence** — for larger businesses. Not always achievable but very high-value when it is.

## Behavioral Signals: What Happens After the Click

Google watches how people interact with your listing. If people click your result and immediately bounce back to search — a "pogo stick" — that's a signal your page wasn't relevant. If they stay, call, or visit, that's positive.

What this means in practice:
- **Page speed is now a ranking factor, not just a UX factor.** Slow pages see higher bounce rates. Higher bounce rates hurt rankings.
- **Mobile experience is critical.** Most local searches happen on phones. If your mobile site is hard to navigate, you'll lose the behavioral signal battle.
- **Clear CTAs convert browsers.** A page where visitors immediately find a phone number or booking button — and use it — signals high relevance.

## AI Answer Inclusion: The New Meta Description

Google's AI Overviews (formerly Search Generative Experience) now appear for many local queries. These summaries pull from pages across the web to answer questions directly.

Getting included in AI Overviews is not about tricks — it's about having genuinely useful, well-structured content that directly answers the questions your customers ask.

Structure your service pages to answer:
- What is this service?
- Who is it for?
- What does it cost (or a price range)?
- How long does it take?
- What are the common questions?

Pages that answer these clearly — using headers and plain language — are getting featured in AI Overviews at higher rates in our client data.

## The Local Pack: Still the Most Valuable Real Estate

The three-pack that appears above organic results for local searches drives 44% of all clicks for those queries. Ranking in it requires:

1. **Google Business Profile fully completed** — every field, photos updated in the last 90 days, weekly posts
2. **Review velocity** — new reviews consistently coming in (not just total count)
3. **Review response rate** — respond to every review within 48 hours
4. **Geographic relevance** — your service area set correctly, with service area pages on your site for each location you serve

## What We'd Do in 30 Days

Week 1: Audit and fix NAP consistency across all directories. Add LocalBusiness schema to your site.

Week 2: Optimize your Google Business Profile. Complete every section. Upload 10 fresh photos. Post an update.

Week 3: Reach out to 5 past clients for reviews. Set up a simple follow-up sequence to request reviews after every completed job.

Week 4: Create or rewrite one service-area page targeting your most valuable local keyword. Structure it to answer the five questions above.

Local SEO compounds. The businesses that are consistently doing these basics — not looking for shortcuts — are the ones dominating their local search results.
    `,
  },
  {
    slug: "building-with-ai-tools",
    tag: "Behind the Build",
    tagColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    title: "Behind the Build: How We Use AI Tools in Our Own Workflow",
    excerpt:
      "We don't just build AI systems for clients — we use them internally. This is an honest look at what we use, what saves time, and what's still overhyped.",
    accent: "from-fuchsia-500/20 to-transparent",
    content: `
## Why This Is Worth Writing

Every agency now claims to be "AI-powered." Most of them mean they used ChatGPT to write a blog post once.

We build AI automation systems for clients for a living. That means we've had to develop an honest internal opinion about what these tools actually do well, where they fail, and what the real workflow looks like when you take them seriously.

Here's the honest version.

## What We Actually Use

**Claude (Anthropic) — daily driver for writing and reasoning**  
Most of our client-facing writing — proposal drafts, strategy documents, email copy — goes through Claude first. It's better than GPT-4 at following a specific voice or maintaining consistency across a long document. We edit heavily, but starting from a well-prompted draft saves 60–70% of the time.

**Cursor — coding**  
All of our development work happens in Cursor (an AI-native code editor). The ability to select a block of code and say "refactor this to be more readable" or "add error handling here" has significantly accelerated our build speed. It's not magic — it still produces bugs — but the feedback loop is faster.

**Perplexity — research**  
When we need current information (a client's industry, recent algorithm updates, competitor analysis), Perplexity is faster than traditional search for most tasks. It cites sources, which matters for factual claims.

**Make (formerly Integromat) + OpenAI API — client automations**  
This is our main stack for building client-facing AI workflows. Make handles the orchestration (triggers, conditions, data routing) and we call the OpenAI or Anthropic API when we need language model reasoning in the loop.

**Notion AI — internal knowledge base**  
We use Notion for internal documentation and project management. The AI features are useful for summarizing meeting notes and drafting SOPs from rough outlines.

## What It Doesn't Do Well

**First-draft quality for anything technical:** AI-written technical content needs heavy editing. The structure is often sound but the specificity is wrong. It fills gaps with plausible-sounding information that isn't accurate.

**Design decisions:** We've tried using AI image tools for client design work. The results are good enough for inspiration but not for production. Our designers don't use them for deliverables.

**Client calls and strategy:** AI doesn't replace the conversations where we're listening to what a client actually needs and adjusting in real time. That part of the business hasn't changed.

**Anything requiring up-to-date local information:** Industry data, specific platform updates, local market context — AI models have a training cutoff and hallucinate current information with confidence.

## The Real Productivity Gain

Here's what we've found: AI tools don't compress a 10-hour task into 1 hour. They tend to compress a 3-hour task into 45 minutes.

The biggest gains aren't in the high-visibility creative work — they're in the invisible operational work. Writing internal documentation, drafting a project proposal, producing a first-pass strategy deck, generating data summaries, handling routine client communications. All of that moves faster.

For us, that adds up to roughly 15–20 hours per week recovered across the team. That's about one part-time employee's worth of capacity — without adding headcount.

## The Honest Answer on ROI

If you're evaluating AI tools for your own business: the ROI is real, but it's not in replacing people. It's in letting the people you have do more of the high-value work and less of the low-value work.

The businesses getting the most from these tools are the ones who are systematic about identifying which tasks to apply them to — not the ones who are buying every new tool that gets announced.

Start with one process. Make it work. Then move to the next.
    `,
  },
];

function renderContent(raw: string) {
  const lines = raw.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-white text-xl font-bold mt-10 mb-4 tracking-tight">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="text-white/80 text-sm font-semibold mb-1">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("- [ ] ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("- [ ] "))) {
        listItems.push(lines[i].replace(/^- \[ \] /, "").replace(/^- /, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-none space-y-2 mb-5 ml-0">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-white/60 text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\. /.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-none space-y-2 mb-5 counter-reset-item">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
              <span className="shrink-0 w-5 h-5 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-white/40 mt-0.5">
                {j + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() === "") {
      /* skip blank lines */
    } else {
      elements.push(
        <p key={i} className="text-white/60 text-sm leading-[1.85] mb-4"
           dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
    i++;
  }

  return elements;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/90 font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-white/75 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="px-1 py-0.5 rounded bg-white/10 text-white/75 text-xs font-mono">$1</code>')
    .replace(/❌/g, '<span class="text-red-400">❌</span>')
    .replace(/✅/g, '<span class="text-emerald-400">✅</span>');
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Article not found.</p>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs transition-colors">
            <ArrowLeft size={13} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0a0a0a] py-10 md:py-14">
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        {/* ── Back ── */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors mb-10">
          <ArrowLeft size={13} /> All articles
        </Link>

        {/* ── Meta ── */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wide ${post.tagColor}`}>
              <Tag size={9} /> {post.tag}
            </span>
            <span className="text-white/25 text-xs flex items-center gap-1.5">
              <Clock size={10} /> {post.readTime}
            </span>
            <span className="text-white/25 text-xs flex items-center gap-1.5">
              <Calendar size={10} /> {post.date}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-4">
            {post.title}
          </h1>
          <p className="text-white/45 text-sm md:text-base leading-relaxed border-l-2 border-white/10 pl-4">
            {post.excerpt}
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-white/[0.07] mb-10" />

        {/* ── Article body ── */}
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* ── Footer CTA ── */}
        <div className="mt-14 pt-8 border-t border-white/[0.07]">
          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">
            Published by KOMPWEB Studios
          </p>
          <p className="text-white/45 text-sm mb-6 leading-relaxed">
            Want to talk through how any of this applies to your business? We offer free 30-minute strategy calls — no pitch, just answers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-9 px-4 bg-white text-black text-xs font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Book a Free Call
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 h-9 px-4 border border-white/12 text-white/60 hover:text-white text-xs font-medium rounded-xl hover:border-white/25 transition-colors"
            >
              <ArrowLeft size={12} /> More Articles
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

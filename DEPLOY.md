# 🚀 Deployment Guide - FYN

## Quick Deploy

### Option 1: Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd /Users/vilgelm/FYN
netlify deploy --prod --dir=public
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/vilgelm/FYN
vercel --prod
```

## Connect Custom Domain

### Netlify
1. Go to https://app.netlify.com
2. Select your site → Domain settings
3. Add custom domain: `fyn.com`
4. Update DNS with your registrar

### Vercel
1. Go to https://vercel.com
2. Select project → Settings → Domains
3. Add domain: `thisfyn.com` (already connected!)
4. DNS automatically configured by Vercel

## Environment Variables

Set these in your deployment platform dashboard:

```
RESEND_API_KEY=re_xxxxx          # For email notifications
AIRTABLE_API_KEY=keyxxxxx        # For storing submissions
AIRTABLE_BASE_ID=appxxxxx        # Your Airtable base
```

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All links work
- [ ] Contact form submits successfully
- [ ] Mobile responsive design works
- [ ] HTTPS is enabled
- [ ] Custom domain connected
- [ ] Analytics configured (optional)
- [ ] Error tracking setup (optional)

## Performance Targets

- ✅ First Contentful Paint < 1s
- ✅ Lighthouse Score > 90
- ✅ Total Page Size < 500KB

## Support

Questions? Contact: team@thisfyn.com

---

**Ready to launch!** 🎉


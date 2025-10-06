#!/bin/bash
# FYN Deployment Script for Vercel

echo "🚀 Deploying FYN to Vercel..."
echo ""
echo "This will:"
echo "  1. Set up your Vercel project"
echo "  2. Deploy to production"
echo "  3. Connect to your thisfyn.com domain"
echo ""

cd /Users/vilgelm/FYN

# Deploy to Vercel
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site should now be live at:"
echo "   https://thisfyn.com"
echo ""
echo "📝 Next steps:"
echo "   1. Go to https://vercel.com/dashboard"
echo "   2. Select your 'fyn' project"
echo "   3. Go to Settings → Domains"
echo "   4. Add 'thisfyn.com' (should already be connected)"
echo ""


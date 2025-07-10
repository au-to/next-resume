#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Setting up Hacknical Next.js project...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...')
  
  const envContent = `# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-change-in-production

# GitHub OAuth Configuration
# Create a GitHub OAuth App at: https://github.com/settings/developers
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database Configuration
DATABASE_URL="file:./dev.db"
`
  
  fs.writeFileSync(envPath, envContent)
  console.log('✅ .env.local created from template\n')
} else {
  console.log('✅ .env.local already exists\n')
}

// Setup database
console.log('🗄️  Setting up database...')
try {
  execSync('npx prisma db push', { stdio: 'inherit' })
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('✅ Database setup complete\n')
} catch (error) {
  console.error('❌ Database setup failed:', error.message)
  process.exit(1)
}

console.log('🎉 Setup complete!')
console.log('\n📋 Next steps:')
console.log('1. Update your GitHub OAuth credentials in .env.local')
console.log('2. Create a GitHub OAuth App at: https://github.com/settings/developers')
console.log('3. Set the callback URL to: http://localhost:3000/api/auth/callback/github')
console.log('4. Run: npm run dev')
console.log('\n🌟 Happy coding!') 
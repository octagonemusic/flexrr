# Flexrr - A Next.js Framework with Payload CMS

![Flexrr Logo](https://github.com/octagonemusic/flexrr/raw/main/public/logo-flexrr.png)

## 📚 Overview

Flexrr is a modern web development framework that combines the power of Next.js with Payload CMS, offering a complete solution for building high-performance, SEO-optimized websites. Designed for developers who prioritize both speed and flexibility, Flexrr streamlines the process of creating content-rich websites without sacrificing developer experience.

**Key Features:**
- 🚀 Built on Next.js 14 with App Router for optimal performance
- 📊 Integrated with Payload CMS for a powerful, customizable admin experience
- 🎨 Fully customizable content model with rich editing capabilities
- 🖼️ Seamless media management via Supabase Storage
- 📱 Responsive design with TailwindCSS
- 🌙 Dark mode support out of the box
- 🧩 Component-based architecture for maximum reusability
- 📈 Built-in SEO optimization tools
- 🔍 Content previews and draft management

## 🚀 Getting Started

There are two ways to start building with Flexrr:

### Option 1: Use Flexrr Studio (Recommended)

Flexrr Studio streamlines the setup process by automating repository creation and configuration:

1. Visit [Flexrr Studio](https://flexrr-studio.vercel.app)
2. Sign in with GitHub
3. Create a new project
4. Configure your project settings (you'll need to set up your own MongoDB and Supabase accounts)
5. Flexrr Studio will clone the template, set up the repository, and provide you with environment variables ready to use for deployment

*Note: Flexrr Studio simplifies the initial setup process, but you'll still need to create and configure your own MongoDB Atlas database and Supabase project.*

### Option 2: Manual Setup

For direct control over the setup process:

1. Clone the repository:
   ```bash
   git clone https://github.com/octagonemusic/flexrr.git my-project
   cd my-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your configuration:
   ```
   # MongoDB (Required for Payload CMS)
   DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   
   # Application Secret
   PAYLOAD_SECRET=your-secure-secret-here
   
   # Supabase Storage (For media uploads)
   S3_BUCKET=your-bucket-name
   S3_ACCESS_KEY_ID=your-supabase-anon-key
   S3_SECRET_ACCESS_KEY=your-supabase-service-role-key
   S3_REGION=your-region
   S3_ENDPOINT=https://your-project-id.supabase.co/storage/v1
   
   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view your site
6. Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Payload CMS admin panel

## ⚙️ Required Services

Flexrr integrates with the following external services:

### 1. MongoDB Atlas

Payload CMS requires MongoDB as its database:
- Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Configure database access (username/password)
- Get your connection string and add it to `.env.local` as `DATABASE_URI`

### 2. Supabase (Recommended for Storage)

For media storage, we recommend Supabase:
- Create an account at [Supabase](https://supabase.com)
- Create a new project
- Set up a storage bucket with appropriate permissions
- Get your API keys from the project settings
- Configure the storage keys in your `.env.local` file

### 3. Vercel (Recommended for Hosting)

For deployment, we recommend Vercel:
- Create an account at [Vercel](https://vercel.com)
- Connect your GitHub repository
- Configure the environment variables from your `.env.local`
- Deploy your project

## 🖥️ Payload CMS

Flexrr leverages Payload CMS to provide a powerful content management experience:

### Admin Panel

Access the admin panel at `/admin` to:
- Create and manage content
- Upload and organize media
- Manage users and permissions
- Configure site settings

### Content Modeling

Flexrr includes pre-configured content models for common content types:
- Pages
- Blog posts
- Navigation menus
- Global settings

You can easily customize these models or create new ones by modifying the collection files in the `/payload/collections` directory.

### Blocks-Based Editing

Create dynamic page layouts using the built-in block editor, which includes:
- Rich text blocks
- Image and gallery blocks
- Call-to-action blocks
- Feature blocks
- Testimonial blocks
- And more!

## 🔧 Configuration Guide

### MongoDB Setup

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new project and cluster
3. Create a database user with read/write permissions
4. Add your IP address to the network access list (or use 0.0.0.0/0 for development)
5. Get your connection string in the format: `mongodb+srv://username:password@cluster.mongodb.net/database`
6. Add it to your `.env.local` file as `DATABASE_URI`

### Supabase Storage Setup

1. Create a [Supabase](https://supabase.com) account
2. Create a new project
3. Go to Storage and create a new bucket
4. Configure bucket policies (either public or private depending on your needs)
5. Get your project URL and API keys from the project settings
6. Configure the S3-compatible storage variables in your `.env.local` file

### Custom Admin User

To create your first admin user:

1. Start the development server
2. Visit `/admin` in your browser
3. Complete the registration form
4. The first user will automatically become an admin

## 🧠 Customizing Flexrr

### Creating Custom Page Templates

1. Create a new page template component in `/components/templates`
2. Add the template to the available options in `/payload/collections/Pages.ts`
3. Create content using the new template in the admin panel

### Adding Custom Block Types

1. Create a new block type in `/payload/blocks`
2. Add the component to render the block in `/components/blocks`
3. Add the block to the available blocks in your content models

### Customizing the Admin Panel

Payload CMS allows extensive customization of the admin panel:

1. Modify `/payload/payload.config.ts` to change global settings
2. Add custom components to the admin UI
3. Create custom field types for specialized content needs

## 🚢 Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy your project

### Optimizing for Production

For the best production performance:

1. Enable ISR or SSG for content pages
2. Configure caching headers appropriately
3. Use a CDN for media assets
4. Enable compression and optimization in your hosting platform

## 🔄 Updating Your Project

To update your Flexrr project to the latest version:

**If using Flexrr Studio:**
1. Open your project in Flexrr Studio
2. Navigate to the project details page
3. Click "Update Project" to apply the latest template changes

**If manually installed:**
```bash
# Pull the latest template changes
git remote add upstream https://github.com/octagonemusic/flexrr.git
git fetch upstream
git merge upstream/main
# Resolve any conflicts
git commit -m "Update to latest Flexrr version"
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to Flexrr:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

Flexrr is open-source software licensed under the [MIT license](LICENSE).

## 🌐 Links

- [GitHub Repository](https://github.com/octagonemusic/flexrr)
- [Issue Tracker](https://github.com/octagonemusic/flexrr/issues)
- [Flexrr Studio](https://flexrr-studio.vercel.app)
- [Payload CMS Documentation](https://payloadcms.com/docs)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Payload CMS](https://payloadcms.com/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

Built with ❤️ by [Bhargav Prasad](https://github.com/octagonemusic)

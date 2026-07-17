import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Boxes, ChevronDown, CircleCheck, Contact, FilePlus2, GripVertical, ImagePlus, Images, LogOut, Menu, MessageSquareQuote, Newspaper, Plus, RefreshCw, Save, Settings, Tags, Trash2, Type, Video, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "@/lib/site-api";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => ({
    meta: [{ title: "Admin Dashboard - Mart Tex" }],
  }),
});

const tokenKey = "martxbd_admin_token";
const adminTabKey = "martxbd_admin_tab";
const adminPageKey = "martxbd_admin_page_key";

type AdminTab = "all-products" | "categories" | "menu" | "contact" | "site-options" | "pages" | "news" | "testimonials" | "brands";

const adminTabs: AdminTab[] = ["all-products", "categories", "menu", "contact", "site-options", "pages", "news", "testimonials", "brands"];

function readStoredAdminTab() {
  if (typeof window === "undefined") return "all-products";
  const stored = window.localStorage.getItem(adminTabKey) as AdminTab | null;
  return stored && adminTabs.includes(stored) ? stored : "all-products";
}

function adminAssetUrl(value?: string) {
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `${API_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  galleryImages?: { url: string; alt?: string; sortOrder?: number }[];
  sortOrder?: number;
  isActive?: boolean;
};

type Product = {
  _id: string;
  name: string;
  slug: string;
  category: Category | string;
  summary?: string;
  description?: string;
  images?: { url: string; alt?: string; sortOrder?: number }[];
  tags?: string[];
  sortOrder?: number;
  isFeatured?: boolean;
  isActive?: boolean;
};

type SiteSettings = {
  companyName?: string;
  email?: string;
  phones?: string[];
  address?: string;
  contactPerson?: string;
  workingHours?: string;
  whatsapp?: string;
  logoUrl?: string;
  faviconUrl?: string;
  footerText?: string;
  copyrightText?: string;
  menuItems?: { label: string; path: string; isActive?: boolean }[];
};

type ContentBlock = {
  _id?: string;
  key: string;
  title?: string;
  subtitle?: string;
  body?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  thumbnail?: string;
  items?: unknown[];
  isActive?: boolean;
};

type HomeSlide = {
  word: string;
  eyebrow: string;
  description: string;
  images: string[];
};

type GalleryImage = {
  type?: "image";
  url: string;
  alt: string;
};

type GalleryVideo = {
  type: "video";
  url: string;
  title: string;
};

function AdminDashboard() {
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<AdminTab>(() => readStoredAdminTab());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({});
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  const isLoggedIn = Boolean(token);

  useEffect(() => {
    setToken(window.localStorage.getItem(tokenKey) || "");
  }, []);

  async function api<T>(path: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers);
    const method = (options.method || "GET").toUpperCase();
    const hasBody = options.body != null;
    if (hasBody && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
    if (token && method !== "GET") headers.set("Authorization", `Bearer ${token}`);

    let response: Response;
    try {
      response = await fetch(`${API_URL}${path}`, { ...options, headers });
    } catch {
      throw new Error(`Could not connect to API server: ${API_URL}`);
    }
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        window.localStorage.removeItem(tokenKey);
        setToken("");
      }
      throw new Error(result.message || "Request failed.");
    }

    return result as T;
  }

  async function loadData() {
    setLoading(true);
    setMessage("");
    try {
      const [categoryRes, productRes, settingsRes, contentRes] = await Promise.all([
        api<{ data: Category[] }>("/api/categories?includeInactive=true"),
        api<{ data: Product[] }>("/api/products?includeInactive=true&limit=100"),
        api<{ data: SiteSettings }>("/api/site-settings"),
        api<{ data: ContentBlock[] }>("/api/content?includeInactive=true"),
      ]);

      setCategories(categoryRes.data || []);
      setProducts(productRes.data || []);
      setSettings(settingsRes.data || {});
      setBlocks(contentRes.data || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) void loadData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 3500);
    return () => window.clearTimeout(timer);
  }, [message]);

  function saveToken(nextToken: string) {
    window.localStorage.setItem(tokenKey, nextToken);
    setToken(nextToken);
  }

  function logout() {
    window.localStorage.removeItem(tokenKey);
    setToken("");
  }

  function selectTab(nextTab: AdminTab) {
    window.localStorage.setItem(adminTabKey, nextTab);
    setTab(nextTab);
    setSidebarOpen(false);
  }

  return (
    <main className="min-h-[calc(100vh+1px)] bg-secondary/40 text-foreground">
      {message && (
        <div className="fixed right-5 top-5 z-[100] flex max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 shadow-xl">
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <span className="flex-1">{message}</span>
          <button type="button" onClick={() => setMessage("")} aria-label="Close notification" className="text-emerald-800/60 hover:text-emerald-950">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <header className="border-b border-border bg-card">
        <div className="container-x flex items-start justify-between gap-3 py-5">
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Mart Tex</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-normal">Admin Dashboard</h1>
          </div>
          {isLoggedIn && (
            <div className="flex shrink-0 items-center gap-2">
              <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md xl:hidden" onClick={() => setSidebarOpen(true)} type="button" aria-label="Open admin menu">
                <Menu className="h-5 w-5" />
              </button>
              <button className="btn-outline h-10 !w-10 !p-0 sm:h-11 sm:!w-[128px] sm:justify-center sm:!px-5 sm:!py-0" onClick={loadData} type="button" aria-label="Refresh dashboard">
                <RefreshCw className="h-4 w-4" /> <span className="hidden sm:inline">Refresh</span>
              </button>
              <button className="btn-outline hidden h-11 !w-[128px] justify-center !px-5 !py-0 xl:inline-flex" onClick={logout} type="button">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="container-x py-8">
        {!isLoggedIn ? (
          <LoginPanel onToken={saveToken} />
        ) : (
          <div className="grid min-w-0 gap-6 xl:grid-cols-[250px_minmax(0,1fr)]">
            {sidebarOpen && (
              <button
                type="button"
                aria-label="Close admin menu"
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-[80] bg-primary/35 backdrop-blur-sm xl:hidden"
              />
            )}
            <aside className={`fixed inset-y-0 left-0 z-[90] block h-full w-[min(320px,85vw)] overflow-y-auto border-r border-border bg-card p-4 shadow-2xl transition-transform duration-300 xl:sticky xl:top-6 xl:z-auto xl:h-fit xl:w-[250px] xl:self-start xl:translate-x-0 xl:overflow-visible xl:rounded-xl xl:border xl:p-3 xl:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3 xl:hidden">
                <div>
                  <p className="eyebrow">Mart Tex</p>
                  <p className="mt-1 font-semibold">Admin menu</p>
                </div>
                <button type="button" onClick={() => setSidebarOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-border" aria-label="Close menu">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="col-span-full px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Products</p>
              <SidebarButton icon={Boxes} label="All products" active={tab === "all-products"} onClick={() => selectTab("all-products")} />
              <SidebarButton icon={Tags} label="Categories" active={tab === "categories"} onClick={() => selectTab("categories")} />
              <div className="col-span-full my-2 border-t border-border xl:my-3" />
              <p className="col-span-full px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Site options</p>
              <SidebarButton icon={Menu} label="Menu" active={tab === "menu"} onClick={() => selectTab("menu")} />
              <SidebarButton icon={Contact} label="Footer & contact" active={tab === "contact"} onClick={() => selectTab("contact")} />
              <SidebarButton icon={Settings} label="Logo & branding" active={tab === "site-options"} onClick={() => selectTab("site-options")} />
              <div className="col-span-full my-2 border-t border-border xl:my-3" />
              <p className="col-span-full px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</p>
              <SidebarButton icon={Type} label="Pages" active={tab === "pages"} onClick={() => selectTab("pages")} />
              <SidebarButton icon={Newspaper} label="News" active={tab === "news"} onClick={() => selectTab("news")} />
              <SidebarButton icon={MessageSquareQuote} label="Testimonials" active={tab === "testimonials"} onClick={() => selectTab("testimonials")} />
              <SidebarButton icon={Images} label="Brand logos" active={tab === "brands"} onClick={() => selectTab("brands")} />
              <div className="mt-4 border-t border-border pt-4 xl:hidden">
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-destructive transition hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </aside>

            <div className="min-w-0">
            {loading ? (
              <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
                Loading content...
              </div>
            ) : (
              <>
                {tab === "all-products" && (
                  <ProductsPanel
                    api={api}
                    categories={categories}
                    reload={loadData}
                    setMessage={setMessage}
                    view="list"
                  />
                )}
                {tab === "categories" && (
                  <CategoriesPanel
                    api={api}
                    categories={categories}
                    reload={loadData}
                    setMessage={setMessage}
                  />
                )}
                {tab === "contact" && (
                  <ContactPanel
                    api={api}
                    settings={settings}
                    setSettings={setSettings}
                    setMessage={setMessage}
                  />
                )}
                {tab === "menu" && <MenuPanel api={api} settings={settings} setSettings={setSettings} setMessage={setMessage} />}
                {tab === "site-options" && <SiteOptionsPanel api={api} settings={settings} setSettings={setSettings} setMessage={setMessage} />}
                {tab === "pages" && (
                  <PagesPanel api={api} blocks={blocks} reload={loadData} setMessage={setMessage} onBack={() => selectTab("all-products")} />
                )}
                {tab === "news" && <ContentCollectionPanel kind="news" blockKey="site-news" api={api} blocks={blocks} reload={loadData} setMessage={setMessage} onBack={() => selectTab("all-products")} />}
                {tab === "testimonials" && <ContentCollectionPanel kind="testimonials" blockKey="home-testimonials" api={api} blocks={blocks} reload={loadData} setMessage={setMessage} />}
                {tab === "brands" && <ContentCollectionPanel kind="brands" blockKey="home-brands" api={api} blocks={blocks} reload={loadData} setMessage={setMessage} />}
              </>
            )}
            </div>
          </div>
        )}
      </div>
      <footer className="border-t border-border bg-card">
        <div className="container-x py-5 text-center text-xs text-muted-foreground">
          Developed by{" "}
          <a
            href="https://ksnirob.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground transition hover:text-primary"
          >
            KS Nirob
          </a>
        </div>
      </footer>
    </main>
  );
}

function LoginPanel({ onToken }: { onToken: (token: string) => void }) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("change-me-now");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Login failed.");
        return;
      }

      onToken(result.token);
    } catch {
      setMessage(`Could not reach the backend. Make sure ${API_URL} is running.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={login} className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold tracking-normal">Login</h2>
      <div className="mt-5 grid gap-4">
        <Field label="Email" value={email} onChange={setEmail} type="email" />
        <Field label="Password" value={password} onChange={setPassword} type="password" />
        {message && <p className="text-sm text-destructive">{message}</p>}
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}

function ProductsPanel({
  api,
  categories,
  reload,
  setMessage,
  view,
}: {
  api: <T>(path: string, options?: RequestInit) => Promise<T>;
  categories: Category[];
  reload: () => Promise<void>;
  setMessage: (message: string) => void;
  view: "list" | "form";
}) {
  const emptyProduct = useMemo(
    () => ({
      name: "",
      category: categories[0]?._id || "",
      summary: "",
      description: "",
      tagsText: "",
      imageUrl: "",
      isFeatured: false,
      isActive: true,
    }),
    [categories],
  );
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => setForm(emptyProduct), [emptyProduct]);

  async function saveProduct(event: React.FormEvent) {
    event.preventDefault();
    const editId = (form as typeof form & { _id?: string })._id;
    const body = {
      name: form.name,
      category: form.category,
      summary: form.summary,
      description: form.description,
      tags: form.tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
      images: form.imageUrl ? [{ url: form.imageUrl, alt: form.name, sortOrder: 0 }] : [],
      isFeatured: form.isFeatured,
      isActive: form.isActive,
    };

    await api(editId ? `/api/products/${editId}` : "/api/products", {
      method: editId ? "PATCH" : "POST",
      body: JSON.stringify(body),
    });

    if (!editId && form.imageUrl) {
      const category = categories.find((item) => item._id === form.category);
      if (category) {
        const galleryImages = [
          ...(category.galleryImages || []),
          {
            url: form.imageUrl,
            alt: form.name,
            sortOrder: category.galleryImages?.length || 0,
          },
        ];
        await api(`/api/categories/${category._id}`, {
          method: "PATCH",
          body: JSON.stringify({ galleryImages }),
        });
      }
    }
    setMessage("Product saved.");
    setForm(emptyProduct);
    await reload();
  }

  async function uploadImage(file: File) {
    const body = new FormData();
    body.append("image", file);
    const result = await api<{ data: { url: string } }>("/api/uploads/image", {
      method: "POST",
      body,
    });
    setForm((current) => ({ ...current, imageUrl: `${API_URL}${result.data.url}` }));
    setMessage("Image uploaded. Save the product to keep it.");
  }

  async function uploadGalleryImages(category: Category, files: File[]) {
    if (!files.length) return;
    setMessage(`Uploading ${files.length} image${files.length === 1 ? "" : "s"}...`);
    const uploadedImages = [];

    for (const file of files) {
      const body = new FormData();
      body.append("image", file);
      const uploaded = await api<{ data: { url: string } }>("/api/uploads/image", {
        method: "POST",
        body,
      });
      uploadedImages.push({
        url: uploaded.data.url,
        alt: category.name,
        sortOrder: (category.galleryImages?.length || 0) + uploadedImages.length,
      });
    }

    const galleryImages = [
      ...(category.galleryImages || []),
      ...uploadedImages,
    ];
    await api(`/api/categories/${category._id}`, {
      method: "PATCH",
      body: JSON.stringify({ galleryImages }),
    });
    setMessage(`${files.length} product image${files.length === 1 ? "" : "s"} added.`);
    await reload();
  }

  async function deleteGalleryImage(category: Category, imageIndex: number) {
    const galleryImages = (category.galleryImages || [])
      .filter((_, index) => index !== imageIndex)
      .map((image, index) => ({ ...image, sortOrder: index }));
    await api(`/api/categories/${category._id}`, {
      method: "PATCH",
      body: JSON.stringify({ galleryImages }),
    });
    setMessage("Product image deleted.");
    await reload();
  }

  return (
    <section className="grid gap-6">
      {view === "form" && (
      <form onSubmit={saveProduct} className="rounded-lg border border-border bg-card p-5">
        <PanelTitle title="Product" action="Add or edit product" />
        <div className="mt-5 grid gap-4">
          <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
          <label className="grid gap-2 text-sm font-medium">
            Category
            <select
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <Field label="Summary" value={form.summary} onChange={(value) => setForm({ ...form, summary: value })} />
          <TextArea
            label="Description"
            value={form.description}
            onChange={(value) => setForm({ ...form, description: value })}
          />
          <Field
            label="Tags"
            value={form.tagsText}
            onChange={(value) => setForm({ ...form, tagsText: value })}
            placeholder="knit, cotton, export"
          />
          <Field
            label="Image URL"
            value={form.imageUrl}
            onChange={(value) => setForm({ ...form, imageUrl: value })}
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm">
            <ImagePlus className="h-4 w-4" />
            Upload image
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadImage(file);
              }}
            />
          </label>
          <Check label="Featured" checked={form.isFeatured} onChange={(value) => setForm({ ...form, isFeatured: value })} />
          <Check label="Active" checked={form.isActive} onChange={(value) => setForm({ ...form, isActive: value })} />
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary" type="submit"><Save className="h-4 w-4" /> Save product</button>
          </div>
        </div>
      </form>
      )}

      {view === "list" && (
      <div className="grid gap-5">
        {categories.map((category) => (
          <article key={category._id} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.galleryImages?.length || 0} product images
                </p>
              </div>
              <label className="btn-outline cursor-pointer px-4 py-2">
                <ImagePlus className="h-4 w-4" /> Add image
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []);
                    if (files.length) void uploadGalleryImages(category, files);
                    event.target.value = "";
                  }}
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {(category.galleryImages || []).map((image, imageIndex) => (
                <div key={`${image.url}-${imageIndex}`} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary">
                  <img src={adminAssetUrl(image.url)} alt={image.alt || category.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    aria-label="Delete product image"
                    onClick={() => void deleteGalleryImage(category, imageIndex)}
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/95 text-destructive opacity-0 shadow transition group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      )}
    </section>
  );
}

function CategoriesPanel({
  api,
  categories,
  reload,
  setMessage,
}: {
  api: <T>(path: string, options?: RequestInit) => Promise<T>;
  categories: Category[];
  reload: () => Promise<void>;
  setMessage: (message: string) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function addCategory(event: React.FormEvent) {
    event.preventDefault();
    await api("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name, description, isActive: true }),
    });
    setName("");
    setDescription("");
    setMessage("Category added.");
    await reload();
  }

  async function updateCategory(category: Category, patch: Partial<Category>) {
    await api(`/api/categories/${category._id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    setMessage("Category updated.");
    await reload();
  }

  async function deleteCategory(category: Category) {
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) return;
    try {
      await api(`/api/categories/${category._id}`, { method: "DELETE" });
      setMessage("Category deleted.");
      await reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete category.");
    }
  }

  return (
    <section className="grid min-w-0 gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <form onSubmit={addCategory} className="rounded-lg border border-border bg-card p-5">
        <PanelTitle title="Category" action="Add category" />
        <div className="mt-5 grid gap-4">
          <Field label="Name" value={name} onChange={setName} />
          <TextArea label="Description" value={description} onChange={setDescription} />
          <button className="btn-primary" type="submit">
            <Plus className="h-4 w-4" /> Add category
          </button>
        </div>
      </form>
      <div className="grid gap-3">
        {categories.map((category) => (
          <article key={category._id} className="rounded-xl border border-border bg-card p-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1.4fr_auto_auto]">
              <Field
                label="Name"
                value={category.name}
                onChange={(value) => updateCategory(category, { name: value })}
              />
              <Field
                label="Description"
                value={category.description || ""}
                onChange={(value) => updateCategory(category, { description: value })}
              />
              <Check
                label="Active"
                checked={category.isActive !== false}
                onChange={(value) => updateCategory(category, { isActive: value })}
              />
              <button
                type="button"
                onClick={() => void deleteCategory(category)}
                className="grid h-10 w-10 place-items-center self-center rounded-full border border-border text-destructive hover:border-destructive"
                aria-label={`Delete ${category.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPanel({
  api,
  settings,
  setSettings,
  setMessage,
}: {
  api: <T>(path: string, options?: RequestInit) => Promise<T>;
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
  setMessage: (message: string) => void;
}) {
  const phonesText = settings.phones?.join(", ") || "";

  async function saveContact(event: React.FormEvent) {
    event.preventDefault();
    const result = await api<{ data: SiteSettings }>("/api/site-settings", {
      method: "PATCH",
      body: JSON.stringify(settings),
    });
    setSettings(result.data);
    setMessage("Contact information saved.");
  }

  return (
    <form onSubmit={saveContact} className="max-w-2xl rounded-lg border border-border bg-card p-4 sm:p-5">
      <PanelTitle title="Contact information" action="Shown on contact/footer areas" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Company" value={settings.companyName || ""} onChange={(value) => setSettings({ ...settings, companyName: value })} />
        <Field
          label="Contact person name"
          value={settings.contactPerson || ""}
          onChange={(value) => setSettings({ ...settings, contactPerson: value })}
          placeholder="Mukhlesur Rahman (Shakil)"
        />
        <Field label="Email" value={settings.email || ""} onChange={(value) => setSettings({ ...settings, email: value })} />
        <Field
          label="Phones"
          value={phonesText}
          onChange={(value) => setSettings({ ...settings, phones: value.split(",").map((phone) => phone.trim()).filter(Boolean) })}
          placeholder="+880..., +880..."
        />
        <Field label="WhatsApp" value={settings.whatsapp || ""} onChange={(value) => setSettings({ ...settings, whatsapp: value })} />
        <Field label="Working hours" value={settings.workingHours || ""} onChange={(value) => setSettings({ ...settings, workingHours: value })} />
        <div className="sm:col-span-2">
          <TextArea label="Address" value={settings.address || ""} onChange={(value) => setSettings({ ...settings, address: value })} />
        </div>
        <button className="btn-primary sm:col-span-2" type="submit">
          <Save className="h-4 w-4" /> Save contact
        </button>
      </div>
    </form>
  );
}

const editablePages = [
  { key: "page-home", label: "Home" },
  { key: "page-about-header", label: "About" },
  { key: "page-profile-header", label: "Profile" },
  { key: "page-products-header", label: "Products" },
  { key: "page-services-header", label: "Services" },
  { key: "page-gallery-header", label: "Gallery" },
  { key: "page-news-header", label: "News" },
  { key: "page-contact-header", label: "Contact" },
];

function readStoredPageKey() {
  if (typeof window === "undefined") return editablePages[0].key;
  const stored = window.localStorage.getItem(adminPageKey);
  return editablePages.some((page) => page.key === stored) ? stored : editablePages[0].key;
}

function PagesPanel({
  api,
  blocks,
  reload,
  setMessage,
  onBack,
}: {
  api: <T>(path: string, options?: RequestInit) => Promise<T>;
  blocks: ContentBlock[];
  reload: () => Promise<void>;
  setMessage: (message: string) => void;
  onBack: () => void;
}) {
  const [selectedKey, setSelectedKey] = useState(() => readStoredPageKey());
  const selected = blocks.find((block) => block.key === selectedKey) || {
    key: selectedKey,
    isActive: true,
  };
  const [draft, setDraft] = useState<ContentBlock>(selected);
  const [expandedSlide, setExpandedSlide] = useState<number | null>(0);
  const isHome = selectedKey === "page-home";
  const isGallery = selectedKey === "page-gallery-header";
  const slides = (draft.items || []) as HomeSlide[];
  const galleryMedia = (draft.items || []) as (GalleryImage | GalleryVideo)[];
  const galleryVideos = galleryMedia.filter((item): item is GalleryVideo => item.type === "video");
  const galleryImages = galleryMedia.filter((item): item is GalleryImage => item.type !== "video");

  useEffect(() => setDraft(selected), [selectedKey, blocks]);

  function selectPage(nextKey: string) {
    window.localStorage.setItem(adminPageKey, nextKey);
    setSelectedKey(nextKey);
  }

  async function uploadThumbnail(file: File) {
    const body = new FormData();
    body.append("image", file);
    const result = await api<{ data: { url: string } }>("/api/uploads/image", {
      method: "POST",
      body,
    });
    setDraft((current) => ({ ...current, thumbnail: result.data.url }));
    setMessage("SEO thumbnail uploaded. Save the page to publish it.");
  }

  function updateSlide(index: number, patch: Partial<HomeSlide>) {
    setDraft({
      ...draft,
      items: slides.map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, ...patch } : slide,
      ),
    });
  }

  async function uploadSlideImages(index: number, files: File[]) {
    const uploadedUrls: string[] = [];
    for (const file of files.slice(0, Math.max(3 - slides[index].images.length, 0))) {
      const body = new FormData();
      body.append("image", file);
      const result = await api<{ data: { url: string } }>("/api/uploads/image", {
        method: "POST",
        body,
      });
      uploadedUrls.push(result.data.url);
    }
    updateSlide(index, { images: [...slides[index].images, ...uploadedUrls].slice(0, 3) });
    setMessage("Slider images uploaded. Save the page to publish them.");
  }

  async function uploadPageGalleryImages(files: File[]) {
    const uploaded: GalleryImage[] = [];
    for (const file of files) {
      const body = new FormData();
      body.append("image", file);
      const result = await api<{ data: { url: string } }>("/api/uploads/image", {
        method: "POST",
        body,
      });
      uploaded.push({ type: "image", url: result.data.url, alt: file.name.replace(/\.[^.]+$/, "") });
    }
    setDraft({ ...draft, items: [...galleryVideos, ...galleryImages, ...uploaded] });
    setMessage(`${uploaded.length} gallery image${uploaded.length === 1 ? "" : "s"} uploaded. Save the page to publish.`);
  }

  async function uploadPageGalleryVideos(files: File[]) {
    try {
      const uploaded: GalleryVideo[] = [];
      for (const file of files) {
        const body = new FormData();
        body.append("video", file);
        const result = await api<{ data: { url: string } }>("/api/uploads/video", {
          method: "POST",
          body,
        });
        uploaded.push({ type: "video", url: result.data.url, title: file.name.replace(/\.[^.]+$/, "") });
      }
      setDraft({ ...draft, items: [...galleryVideos, ...uploaded, ...galleryImages] });
      setMessage(`${uploaded.length} gallery video${uploaded.length === 1 ? "" : "s"} uploaded. Save the page to publish.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Video upload failed.");
    }
  }

  async function savePage(event: React.FormEvent) {
    event.preventDefault();
    await api(`/api/content/${draft.key}`, {
      method: "PUT",
      body: JSON.stringify({
        title: draft.title || "",
        body: draft.body || "",
        seoTitle: draft.seoTitle || "",
        seoDescription: draft.seoDescription || "",
        thumbnail: draft.thumbnail || "",
        items: draft.items || [],
        isActive: draft.isActive !== false,
      }),
    });
    setMessage("Page heading and description saved.");
    await reload();
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="rounded-lg border border-border bg-card p-4">
        <button type="button" onClick={onBack} className="btn-outline mb-4 w-fit">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <PanelTitle title="Pages" action="Choose a page" />
        <div className="mt-4 grid gap-2">
          {editablePages.map((page) => (
            <button
              key={page.key}
              onClick={() => selectPage(page.key)}
              className={`rounded-lg border px-3 py-2 text-left text-sm ${
                selectedKey === page.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
              }`}
              type="button"
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={savePage} className="rounded-lg border border-border bg-card p-5">
        <PanelTitle
          title={`${editablePages.find((page) => page.key === selectedKey)?.label || "Page"} header`}
          action="Top heading and description"
        />
        <div className="mt-5 grid gap-4">
          {isHome ? (
            <div className="grid gap-5">
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="rounded-xl border border-border bg-background p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSlide((current) => (current === slideIndex ? null : slideIndex))
                      }
                      className="flex flex-1 items-center justify-between gap-3 text-left"
                    >
                      <span>
                        <span className="block font-semibold">Slide {slideIndex + 1}</span>
                        <span className="block text-xs text-muted-foreground">
                          {slide.word || "Untitled slide"}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          expandedSlide === slideIndex ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      className="btn-outline px-3 py-2 text-destructive"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          items: slides.filter((_, index) => index !== slideIndex),
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                  {expandedSlide === slideIndex && <div className="grid gap-4 border-t border-border pt-4">
                    <Field label="Large word" value={slide.word} onChange={(value) => updateSlide(slideIndex, { word: value })} placeholder="CRAFT" />
                    <Field label="Eyebrow" value={slide.eyebrow} onChange={(value) => updateSlide(slideIndex, { eyebrow: value })} />
                    <TextArea label="Description" value={slide.description} onChange={(value) => updateSlide(slideIndex, { description: value })} />
                    <div>
                      <p className="mb-2 text-sm font-medium">Model images (maximum 3)</p>
                      <div className="grid grid-cols-3 gap-3">
                        {slide.images.map((image, imageIndex) => (
                          <div key={`${image}-${imageIndex}`} className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-secondary">
                            <img src={adminAssetUrl(image)} alt="" className="h-full w-full object-contain" />
                            <button
                              type="button"
                              onClick={() => updateSlide(slideIndex, { images: slide.images.filter((_, index) => index !== imageIndex) })}
                              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white text-destructive shadow"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {slide.images.length < 3 && (
                      <label className="btn-outline w-fit cursor-pointer">
                        <ImagePlus className="h-4 w-4" /> Add images
                        <input
                          className="hidden"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(event) => {
                            const files = Array.from(event.target.files || []);
                            if (files.length) void uploadSlideImages(slideIndex, files);
                            event.target.value = "";
                          }}
                        />
                      </label>
                    )}
                  </div>}
                </div>
              ))}
              <button
                type="button"
                className="btn-outline w-fit"
                onClick={() =>
                  {
                    setDraft({
                      ...draft,
                      items: [
                        ...slides,
                        { word: "NEW", eyebrow: "New collection", description: "", images: [] },
                      ],
                    });
                    setExpandedSlide(slides.length);
                  }
                }
              >
                <Plus className="h-4 w-4" /> Add slide
              </button>
            </div>
          ) : (
            <>
              <Field label="Top heading" value={draft.title || ""} onChange={(value) => setDraft({ ...draft, title: value })} />
              <TextArea label="Description" value={draft.body || ""} onChange={(value) => setDraft({ ...draft, body: value })} />
              {isGallery && (
                <div className="grid gap-4 rounded-xl border border-border bg-background p-4">
                  <div className="grid gap-4 rounded-lg border border-border bg-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">Gallery videos</h3>
                        <p className="text-xs text-muted-foreground">{galleryVideos.length} videos</p>
                      </div>
                      <label className="btn-outline cursor-pointer">
                        <Video className="h-4 w-4" /> Add videos
                        <input
                          className="hidden"
                          type="file"
                          accept="video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.webm,.ogv,.ogg,.mov"
                          multiple
                          onChange={(event) => {
                            const files = Array.from(event.target.files || []);
                            if (files.length) void uploadPageGalleryVideos(files);
                            event.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {galleryVideos.map((video, videoIndex) => (
                        <div key={`${video.url}-${videoIndex}`} className="relative overflow-hidden rounded-lg border border-border">
                          <video src={adminAssetUrl(video.url)} controls preload="metadata" className="aspect-video w-full bg-black object-cover" />
                          <button
                            type="button"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                items: [
                                  ...galleryVideos.filter((_, index) => index !== videoIndex),
                                  ...galleryImages,
                                ],
                              })
                            }
                            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white text-destructive shadow"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <input
                            value={video.title}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                items: [
                                  ...galleryVideos.map((item, index) =>
                                    index === videoIndex ? { ...item, title: event.target.value } : item,
                                  ),
                                  ...galleryImages,
                                ],
                              })
                            }
                            className="w-full border-t border-border bg-white px-2 py-2 text-xs"
                            placeholder="Video title"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">Gallery images</h3>
                      <p className="text-xs text-muted-foreground">{galleryImages.length} images</p>
                    </div>
                    <label className="btn-outline cursor-pointer">
                      <ImagePlus className="h-4 w-4" /> Add images
                      <input
                        className="hidden"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          const files = Array.from(event.target.files || []);
                          if (files.length) void uploadPageGalleryImages(files);
                          event.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {galleryImages.map((image, imageIndex) => (
                      <div key={`${image.url}-${imageIndex}`} className="relative overflow-hidden rounded-lg border border-border">
                        <img src={adminAssetUrl(image.url)} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              items: [
                                ...galleryVideos,
                                ...galleryImages.filter((_, index) => index !== imageIndex),
                              ],
                            })
                          }
                          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white text-destructive shadow"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <input
                          value={image.alt}
                          onChange={(event) =>
                            setDraft({
                              ...draft,
                              items: [
                                ...galleryVideos,
                                ...galleryImages.map((item, index) =>
                                  index === imageIndex ? { ...item, alt: event.target.value } : item,
                                ),
                              ],
                            })
                          }
                          className="w-full border-t border-border bg-white px-2 py-2 text-xs"
                          placeholder="Image alt text"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          <div className="my-1 border-t border-border" />
          <PanelTitle title="SEO settings" action="Search and social sharing" />
          <Field
            label="SEO title"
            value={draft.seoTitle || ""}
            onChange={(value) => setDraft({ ...draft, seoTitle: value })}
            placeholder="Page title shown in search results"
          />
          <TextArea
            label="Meta description"
            value={draft.seoDescription || ""}
            onChange={(value) => setDraft({ ...draft, seoDescription: value })}
          />
          <Field
            label="Thumbnail URL"
            value={draft.thumbnail || ""}
            onChange={(value) => setDraft({ ...draft, thumbnail: value })}
          />
          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm">
            <ImagePlus className="h-4 w-4" /> Upload thumbnail
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadThumbnail(file);
              }}
            />
          </label>
          {draft.thumbnail && (
            <img
              src={adminAssetUrl(draft.thumbnail)}
              alt="SEO thumbnail preview"
              className="aspect-[1.91/1] w-full max-w-md rounded-lg border border-border object-cover"
            />
          )}
          <button className="btn-primary" type="submit">
            <Save className="h-4 w-4" /> Save page
          </button>
        </div>
      </form>
    </section>
  );
}

function ContentCollectionPanel({
  kind,
  blockKey,
  api,
  blocks,
  reload,
  setMessage,
  onBack,
}: {
  kind: "news" | "testimonials" | "brands";
  blockKey: string;
  api: <T>(path: string, options?: RequestInit) => Promise<T>;
  blocks: ContentBlock[];
  reload: () => Promise<void>;
  setMessage: (message: string) => void;
  onBack?: () => void;
}) {
  const source = blocks.find((block) => block.key === blockKey);
  const [items, setItems] = useState<Record<string, string>[]>(
    (source?.items || []) as Record<string, string>[],
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  useEffect(() => {
    setItems((source?.items || []) as Record<string, string>[]);
  }, [source]);

  const labels = {
    news: "News",
    testimonials: "Testimonials",
    brands: "Brand logos",
  };

  function addItem() {
    const item =
      kind === "news"
        ? { title: "New article", slug: `article-${Date.now()}`, tag: "News", date: "", lead: "", body: "", image: "" }
        : kind === "testimonials"
          ? { name: "New client", role: "", initials: "", quote: "" }
          : { name: "Brand", image: "" };
    setExpandedItem(0);
    setItems((current) => [item, ...current]);
  }

  function updateItem(index: number, patch: Record<string, string>) {
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    );
  }

  async function uploadItemImage(index: number, file: File) {
    const body = new FormData();
    body.append("image", file);
    const result = await api<{ data: { url: string } }>("/api/uploads/image", {
      method: "POST",
      body,
    });
    updateItem(index, { image: result.data.url });
    setMessage("Image uploaded. Save changes to publish it.");
  }

  async function uploadBrandLogos(files: File[]) {
    const uploaded: Record<string, string>[] = [];
    setMessage(`Uploading ${files.length} logo${files.length === 1 ? "" : "s"}...`);
    for (const file of files) {
      const body = new FormData();
      body.append("image", file);
      const result = await api<{ data: { url: string } }>("/api/uploads/image", {
        method: "POST",
        body,
      });
      uploaded.push({
        name: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
        image: result.data.url,
      });
    }
    setItems((current) => [...current, ...uploaded]);
    setMessage(`${uploaded.length} logo${uploaded.length === 1 ? "" : "s"} uploaded. Save changes to publish.`);
  }

  function moveItem(from: number, to: number) {
    if (from === to) return;
    setItems((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  async function saveItems() {
    await api(`/api/content/${blockKey}`, {
      method: "PUT",
      body: JSON.stringify({ items, isActive: true }),
    });
    setMessage(`${labels[kind]} saved.`);
    await reload();
  }

  return (
    <section className="max-w-5xl rounded-xl border border-border bg-card p-4 sm:p-5">
      {onBack && (
        <button type="button" onClick={onBack} className="btn-outline mb-4 w-fit">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PanelTitle title={labels[kind]} />
        {kind === "brands" ? (
          <label className="btn-outline cursor-pointer">
            <ImagePlus className="h-4 w-4" /> Add logos
            <input
              className="hidden"
              type="file"
              accept="image/*,.svg"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files || []);
                if (files.length) void uploadBrandLogos(files);
                event.target.value = "";
              }}
            />
          </label>
        ) : (
          <button type="button" className="btn-outline" onClick={addItem}>
            <Plus className="h-4 w-4" /> Add
          </button>
        )}
      </div>
      <div className="mt-5 grid gap-4">
        {kind === "brands" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={`${item.image}-${index}`}
                draggable
                onDragStart={() => setDraggedIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (draggedIndex !== null) moveItem(draggedIndex, index);
                  setDraggedIndex(null);
                }}
                onDragEnd={() => setDraggedIndex(null)}
                className={`group relative rounded-xl border bg-background p-3 transition ${
                  draggedIndex === index ? "border-primary opacity-50" : "border-border"
                }`}
              >
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-lg border border-border bg-white p-3">
                  {item.image ? (
                    <img
                      src={adminAssetUrl(item.image)}
                      alt="Brand logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">No logo</span>
                  )}
                  <span className="absolute left-2 top-2 grid h-8 w-8 cursor-grab place-items-center rounded-full bg-white/95 text-muted-foreground shadow">
                    <GripVertical className="h-4 w-4" />
                  </span>
                  <button
                    type="button"
                    aria-label="Delete logo"
                    onClick={() =>
                      setItems((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-destructive shadow"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {kind !== "brands" && (
          <div className={kind === "news" || kind === "testimonials" ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
          {items.map((item, index) => {
          if (kind === "news" && expandedItem !== null && expandedItem !== index) return null;
          return (
          <div key={index} className={`overflow-hidden rounded-xl border border-border bg-background ${(kind === "news" || kind === "testimonials") && expandedItem === index ? "md:col-span-2" : ""}`}>
            {kind === "news" && (
              <div className={`grid gap-4 p-4 ${expandedItem === index ? "sm:grid-cols-[180px_1fr]" : ""}`}>
                {item.image && (
                  <img
                    src={adminAssetUrl(item.image)}
                    alt=""
                    className={`w-full rounded-lg border border-border object-cover ${expandedItem === index ? "aspect-[4/3]" : "aspect-[16/8]"}`}
                  />
                )}
                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {item.tag || "News"} · {item.date || "No date"}
                      </p>
                      <h3 className="mt-2 line-clamp-2 font-display text-xl text-primary">
                        {item.title || "Untitled article"}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedItem((current) => (current === index ? null : index))
                      }
                      className="btn-outline !w-auto self-start px-4 py-2"
                    >
                      {expandedItem === index ? "Close" : "Edit"}
                    </button>
                  </div>
                  {expandedItem !== index && item.lead && (
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{item.lead}</p>
                  )}
                </div>
              </div>
            )}
            {kind === "testimonials" && (
              <div className="flex flex-col gap-4 p-4 sm:flex-row">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 font-display text-sm text-primary">
                  {item.initials || "—"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name || "Unnamed client"}</h3>
                      <p className="text-xs text-muted-foreground">{item.role || "No role"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedItem((current) => (current === index ? null : index))
                      }
                      className="btn-outline !w-auto self-start px-4 py-2"
                    >
                      {expandedItem === index ? "Close" : "Edit"}
                    </button>
                  </div>
                  {expandedItem !== index && (
                    <p className="mt-3 line-clamp-3 text-sm italic text-foreground/75">
                      “{item.quote || "No testimonial text"}”
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className={`flex justify-end px-4 ${kind === "news" || kind === "testimonials" ? "pb-4" : "pt-4"}`}>
              <button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-border text-destructive" onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {((kind !== "news" && kind !== "testimonials") || expandedItem === index) && <div className="grid gap-4 border-t border-border p-4 sm:grid-cols-2">
              {kind === "news" && (
                <>
                  <Field label="Title" value={item.title || ""} onChange={(value) => updateItem(index, { title: value })} />
                  <Field label="Slug" value={item.slug || ""} onChange={(value) => updateItem(index, { slug: value })} />
                  <Field label="Category" value={item.tag || ""} onChange={(value) => updateItem(index, { tag: value })} />
                  <Field label="Date" value={item.date || ""} onChange={(value) => updateItem(index, { date: value })} />
                  <div className="sm:col-span-2"><TextArea label="Summary" value={item.lead || ""} onChange={(value) => updateItem(index, { lead: value })} /></div>
                  <div className="sm:col-span-2"><TextArea label="Article body (separate paragraphs with a blank line)" value={item.body || ""} onChange={(value) => updateItem(index, { body: value })} /></div>
                </>
              )}
              {kind === "testimonials" && (
                <>
                  <Field label="Name" value={item.name || ""} onChange={(value) => updateItem(index, { name: value })} />
                  <Field label="Role / company" value={item.role || ""} onChange={(value) => updateItem(index, { role: value })} />
                  <Field label="Initials" value={item.initials || ""} onChange={(value) => updateItem(index, { initials: value })} />
                  <div className="sm:col-span-2"><TextArea label="Quote" value={item.quote || ""} onChange={(value) => updateItem(index, { quote: value })} /></div>
                </>
              )}
              {kind !== "testimonials" && (
                <div className={kind === "news" ? "sm:col-span-2" : ""}>
                  <Field label="Image URL" value={item.image || ""} onChange={(value) => updateItem(index, { image: value })} />
                  <label className="btn-outline mt-3 w-fit cursor-pointer">
                    <ImagePlus className="h-4 w-4" /> Upload image
                    <input className="hidden" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadItemImage(index, file); }} />
                  </label>
                  {item.image && <img src={adminAssetUrl(item.image)} alt="" className="mt-3 h-24 max-w-full rounded-lg border border-border object-contain" />}
                </div>
              )}
            </div>}
          </div>
        );
        })}
          </div>
        )}
      </div>
      <button type="button" className="btn-primary mt-5" onClick={saveItems}>
        <Save className="h-4 w-4" /> Save changes
      </button>
    </section>
  );
}

function MenuPanel({
  api,
  settings,
  setSettings,
  setMessage,
}: {
  api: <T>(path: string, options?: RequestInit) => Promise<T>;
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
  setMessage: (message: string) => void;
}) {
  const items = settings.menuItems || [];

  function updateItem(index: number, patch: Partial<(typeof items)[number]>) {
    setSettings({ ...settings, menuItems: items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item) });
  }

  async function saveMenu() {
    const result = await api<{ data: SiteSettings }>("/api/site-settings", {
      method: "PATCH",
      body: JSON.stringify({ menuItems: items }),
    });
    setSettings(result.data);
    setMessage("Website menu saved.");
  }

  return (
    <section className="max-w-4xl rounded-xl border border-border bg-card p-5">
      <PanelTitle title="Website menu" action="Header and footer navigation" />
      <div className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <div key={`${item.path}-${index}`} className="grid gap-3 rounded-lg border border-border bg-background p-4 md:grid-cols-[1fr_1.4fr_auto_auto]">
            <Field label="Label" value={item.label} onChange={(value) => updateItem(index, { label: value })} />
            <Field label="Path" value={item.path} onChange={(value) => updateItem(index, { path: value })} placeholder="/about" />
            <Check label="Visible" checked={item.isActive !== false} onChange={(value) => updateItem(index, { isActive: value })} />
            <button type="button" className="btn-outline self-center px-3 py-2.5" onClick={() => setSettings({ ...settings, menuItems: items.filter((_, itemIndex) => itemIndex !== index) })}><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        <button type="button" className="btn-outline w-fit" onClick={() => setSettings({ ...settings, menuItems: [...items, { label: "New link", path: "/", isActive: true }] })}>
          <FilePlus2 className="h-4 w-4" /> Add menu item
        </button>
        <button type="button" className="btn-primary w-fit" onClick={saveMenu}><Save className="h-4 w-4" /> Save menu</button>
      </div>
    </section>
  );
}

function SiteOptionsPanel({
  api,
  settings,
  setSettings,
  setMessage,
}: {
  api: <T>(path: string, options?: RequestInit) => Promise<T>;
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
  setMessage: (message: string) => void;
}) {
  async function uploadLogo(file: File) {
    const body = new FormData();
    body.append("image", file);
    const result = await api<{ data: { url: string } }>("/api/uploads/image", { method: "POST", body });
    setSettings({ ...settings, logoUrl: result.data.url });
    setMessage("Logo uploaded. Save branding to publish it.");
  }

  async function uploadFavicon(file: File) {
    try {
      setMessage("Uploading favicon...");
      const body = new FormData();
      body.append("image", file);
      const result = await api<{ data: { url: string } }>("/api/uploads/image", { method: "POST", body });
      const saved = await api<{ data: SiteSettings }>("/api/site-settings", {
        method: "PATCH",
        body: JSON.stringify({ faviconUrl: result.data.url }),
      });
      setSettings(saved.data);
      setMessage("Favicon uploaded and published.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Favicon upload failed.");
    }
  }

  async function saveOptions(event: React.FormEvent) {
    event.preventDefault();
    const result = await api<{ data: SiteSettings }>("/api/site-settings", {
      method: "PATCH",
      body: JSON.stringify({
        companyName: settings.companyName || "",
        logoUrl: settings.logoUrl || "",
        faviconUrl: settings.faviconUrl || "",
        footerText: settings.footerText || "",
        copyrightText: settings.copyrightText || "",
      }),
    });
    setSettings(result.data);
    setMessage("Branding options saved.");
  }

  return (
    <form onSubmit={saveOptions} className="max-w-2xl rounded-xl border border-border bg-card p-4 sm:p-5">
      <PanelTitle title="Logo and branding" action="Used across header and footer" />
      <div className="mt-5 grid gap-4">
        <Field label="Company name" value={settings.companyName || ""} onChange={(value) => setSettings({ ...settings, companyName: value })} />
        <Field label="Logo URL" value={settings.logoUrl || ""} onChange={(value) => setSettings({ ...settings, logoUrl: value })} />
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm">
          <ImagePlus className="h-4 w-4" /> Upload logo
          <input className="hidden" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadLogo(file); }} />
        </label>
        {settings.logoUrl && <img src={settings.logoUrl.startsWith("http") ? settings.logoUrl : `${API_URL}${settings.logoUrl}`} alt="Logo preview" className="h-20 w-auto max-w-xs rounded-lg border border-border bg-background p-3 object-contain" />}
        <Field label="Favicon URL" value={settings.faviconUrl || ""} onChange={(value) => setSettings({ ...settings, faviconUrl: value })} />
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm">
          <ImagePlus className="h-4 w-4" /> Upload favicon
          <input className="hidden" type="file" accept=".ico,.png,.svg,.jpg,.jpeg,.webp,image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadFavicon(file); }} />
        </label>
        {settings.faviconUrl && <img src={settings.faviconUrl.startsWith("http") ? settings.faviconUrl : `${API_URL}${settings.faviconUrl}`} alt="Favicon preview" className="h-12 w-12 rounded-lg border border-border bg-background p-2 object-contain" />}
        <TextArea label="Footer description" value={settings.footerText || ""} onChange={(value) => setSettings({ ...settings, footerText: value })} />
        <Field label="Copyright text" value={settings.copyrightText || ""} onChange={(value) => setSettings({ ...settings, copyrightText: value })} />
        <button className="btn-primary w-fit" type="submit"><Save className="h-4 w-4" /> Save branding</button>
      </div>
    </form>
  );
}

function SidebarButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:bg-secondary hover:text-primary"}`}>
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function PanelTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div>
      {action && <p className="eyebrow">{action}</p>}
      <h2 className={action ? "mt-1 text-xl font-semibold tracking-normal" : "text-xl font-semibold tracking-normal"}>{title}</h2>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        placeholder={placeholder}
        className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
        className="h-4 w-4 rounded border-input"
      />
      {label}
    </label>
  );
}

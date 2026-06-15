/**
 * FILE PURPOSE: Settings page with profile, password, theme, notification, and account deletion
 * 
 * CONNECTIONS:
 * - Imports from: @platform/ui (Card, Button, Input, Select, Skeleton, PageHeader),
 *                 @platform/store (useAuthStore for user info, useThemeStore for dark/light toggle)
 * - Used by: ./app.tsx
 * 
 * For a backend developer: This component renders the full settings screen with profile editing,
 * password change (with validation), theme toggle, notification checkboxes, and a danger zone
 * for account deletion with confirmation. Auth/theme state comes from @platform/store zustand stores.
 */
import { useState, useEffect } from 'react';
import { Card, Button, Input, Select, Skeleton, PageHeader } from '@platform/ui';
import { useAuthStore, useThemeStore } from '@platform/store';

export function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwChanged, setPwChanged] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  };

  const handlePasswordChange = () => {
    if (!currentPw || !newPw || newPw !== confirmPw) return;
    setPwSaving(true);
    setTimeout(() => {
      setPwSaving(false);
      setPwChanged(true);
      setTimeout(() => setPwChanged(false), 2500);
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    }, 600);
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-52 mt-2" />
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Settings' }]}
      />

      <Card title="Profile">
        <div className="space-y-4">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Select
            label="Role"
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'viewer', label: 'Viewer' },
            ]}
            value={user?.role ?? 'viewer'}
          />
          <div className="flex items-center gap-3 pt-1">
            <Button onClick={handleSave} loading={saving}>{saved ? 'Saved!' : 'Save Changes'}</Button>
            {saved && !saving && (
              <span className="flex items-center gap-1 text-sm text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Changes saved
              </span>
            )}
          </div>
        </div>
      </Card>

      <Card title="Change Password">
        <div className="space-y-4">
          <Input label="Current Password" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} />
          <Input label="New Password" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className={newPw && confirmPw && newPw !== confirmPw ? 'border-red-500' : ''}
          />
          {newPw && confirmPw && newPw !== confirmPw && (
            <p className="text-xs text-red-400 -mt-2">Passwords do not match</p>
          )}
          <div className="flex items-center gap-3 pt-1">
            <Button
              onClick={handlePasswordChange}
              disabled={!currentPw || !newPw || newPw !== confirmPw}
              loading={pwSaving}
            >
              {pwChanged ? 'Updated!' : 'Update Password'}
            </Button>
            {pwChanged && !pwSaving && (
              <span className="flex items-center gap-1 text-sm text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Password updated
              </span>
            )}
          </div>
        </div>
      </Card>

      <Card title="Preferences">
        <div className="space-y-4">
          <Select
            label="Theme"
            options={[
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' },
            ]}
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
          />
          <div className="space-y-3 pt-2">
            {['Email notifications', 'Push notifications', 'Weekly digest', 'Product updates'].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-700 bg-gray-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Danger Zone" className="border-red-900/30">
        <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back.</p>
        <Button variant="danger" onClick={() => setDeleteConfirm(true)}>Delete Account</Button>
      </Card>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(false)} />
          <div className="relative w-full max-w-sm rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-gray-100">Delete Account</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-400">
                Are you absolutely sure? This will permanently delete your account and all associated data.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDeleting(true);
                  setTimeout(() => {
                    setDeleteConfirm(false);
                    setDeleting(false);
                  }, 1500);
                }}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-500 text-white transition-all inline-flex items-center gap-2 disabled:opacity-50"
              >
                {deleting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

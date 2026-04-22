"use client";

import { getUserProfile, updateUserPassword, updateUserPin, updateUserPhone, updateUserImage } from "@/actions/updateUser";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Phone, Lock, KeyRound, Image as ImageIcon } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  image: string;
  balance: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }

    async function fetchProfile() {
      const res = await getUserProfile();
      if (!res.ok) {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      if (res.data) {
        setProfile(res.data);
        setPhone(res.data.phone);
        setImage(res.data.image);
      }
      setLoading(false);
    }

    if (session.status === "authenticated") {
      fetchProfile();
    }
  }, [session.status, router]);

  // Close preview on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleUpdatePassword = async () => {
    if (!password || password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setUpdating(true);
    const res = await updateUserPassword(password);
    setUpdating(false);

    if (res.ok) {
      toast({
        title: "Success",
        description: res.message
      });
      setPassword("");
      setConfirmPassword("");
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdatePin = async () => {
    if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be exactly 4 digits",
        variant: "destructive"
      });
      return;
    }

    if (pin !== confirmPin) {
      toast({
        title: "PIN Mismatch",
        description: "PINs do not match",
        variant: "destructive"
      });
      return;
    }

    setUpdating(true);
    const res = await updateUserPin(pin);
    setUpdating(false);

    if (res.ok) {
      toast({
        title: "Success",
        description: res.message
      });
      setPin("");
      setConfirmPin("");
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdatePhone = async () => {
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast({
        title: "Invalid Phone",
        description: "Phone number must be exactly 10 digits",
        variant: "destructive"
      });
      return;
    }

    setUpdating(true);
    const res = await updateUserPhone(phone);
    setUpdating(false);

    if (res.ok) {
      toast({
        title: "Success",
        description: res.message
      });
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateImage = async () => {
    if (!image) {
      toast({
        title: "Invalid Image",
        description: "Please provide an image URL",
        variant: "destructive"
      });
      return;
    }

    setUpdating(true);
    const res = await updateUserImage(image);
    setUpdating(false);

    if (res.ok) {
      toast({
        title: "Success",
        description: res.message
      });
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex space-x-2 justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <span className="text-white">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Profile Settings</h1>

        {/* Profile Info Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-red-500 to-blue-500 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">{profile?.name}</h2>
              <p className="text-gray-300">Balance: ₹{profile?.balance}</p>
            </div>
          </div>
        </div>

        {/* Update Phone */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Update Phone Number
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="10-digit phone number"
              />
            </div>
            <button
              onClick={handleUpdatePhone}
              disabled={updating}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {updating && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Phone
            </button>
          </div>
        </div>

        {/* Update Image */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Update Profile Image
          </h3>
          <div className="space-y-4">
            {/* Current image preview */}
            <div className="flex items-center gap-4">
              {image || profile?.image ? (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewSrc((image || profile?.image) as string);
                    setPreviewOpen(true);
                  }}
                  className="outline-none"
                >
                  <img
                    src={(image || profile?.image) as string}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-white/30 hover:ring-blue-400 transition"
                  />
                </button>
              ) : (
                <div className="w-20 h-20 rounded-full ring-2 ring-white/30 bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold">
                  {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="text-gray-300 text-sm">Current image preview (click to enlarge)</div>
            </div>
            {/* Upload button */}
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                try {
                  const url = res?.[0]?.url;
                  if (!url) {
                    toast({ title: "Upload failed", description: "No URL returned", variant: "destructive" });
                    return;
                  }
                  setUpdating(true);
                  const out = await updateUserImage(url);
                  setUpdating(false);
                  if (out.ok) {
                    setImage(url);
                    setProfile((p) => (p ? { ...p, image: url } : p));
                    toast({ title: "Success", description: "Profile image updated" });
                  } else {
                    toast({ title: "Error", description: out.message, variant: "destructive" });
                  }
                } catch (e) {
                  setUpdating(false);
                  toast({ title: "Upload error", description: "Unexpected error during upload", variant: "destructive" });
                }
              }}
              onUploadError={(error) => {
                toast({ title: "Upload error", description: error.message, variant: "destructive" });
              }}
              appearance={{
                button: "ut-ready:bg-blue-600 ut-uploading:bg-gray-500 text-white px-4 py-2 rounded-lg",
                container: "w-fit",
              }}
            />
          </div>
        </div>

        {/* Update Password */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Update Password
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 pr-10"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Re-enter password"
              />
            </div>
            <button
              onClick={handleUpdatePassword}
              disabled={updating}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {updating && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </button>
          </div>
        </div>

        {/* Update PIN */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Update PIN
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New PIN</label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 pr-10"
                  placeholder="4-digit PIN"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm PIN</label>
              <input
                type={showPin ? "text" : "password"}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                maxLength={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Re-enter PIN"
              />
            </div>
            <button
              onClick={handleUpdatePin}
              disabled={updating}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {updating && <Loader2 className="w-4 h-4 animate-spin" />}
              Update PIN
            </button>
          </div>
        </div>
      </div>
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={(previewSrc || image || profile?.image) as string}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Edit, Check, X, Key, Shield, User, Globe } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Harshit Srivastava",
    email: "harshitsrivastava2004h@outlook.com",
    phone: "None",
    dateOfBirth: "12/15/2000",
    country: "India",
    language: "English (United States), English (India)",
    regionalFormat: "English (India); 31-08-2000; 01:01 AM - 11:59 PM",
    avatar: "/placeholder.svg",
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = (field: string) => {
    setProfile({ ...profile, [field]: tempValue });
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (date: Date) => {
    setTempValue(date.toLocaleDateString());
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempValue(e.target.value);
  };

  const countries = ["India", "USA", "UK", "Canada", "Australia","Pakistan","Myanmar","China","Russia"];
  const languages = ["English (United States)", "English (India)", "French", "Spanish","Hindi"];

  return (
    <div className="px-8 py-12 max-w-3xl mx-auto">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Heading */}
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent mb-6">Profile Settings</h1>

      {/* Card */}
      <div className="mt-8">
        <Card className="bg-white dark:bg-gray-900 shadow-md border border-gray-200/50 dark:border-gray-800/50">
          <CardHeader className="border-b p-6 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-4 border-purple-100 dark:border-purple-900/30">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{profile.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Personalize your account with a profile photo.
                </p>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Button variant="outline" size="sm" className="mt-2 border-purple-200 dark:border-purple-800/40 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                    Change photo
                  </Button>
                </Label>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Profile Information */}
            <div className="border-b pb-4 flex items-center">
              <User className="w-5 h-5 text-purple-500 dark:text-purple-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Profile Info</h3>
            </div>

            <ProfileField
              label="Full Name"
              value={profile.name}
              field="name"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            <ProfileField
              label="Date of Birth"
              value={profile.dateOfBirth}
              field="dateOfBirth"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              isDateField={true}
              onDateChange={handleDateChange}
            />

            <ProfileField
              label="Country or Region"
              value={profile.country}
              field="country"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              isSelectField={true}
              options={countries}
              onSelectChange={handleSelectChange}
            />

            <ProfileField
              label="Language"
              value={profile.language}
              field="language"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              isSelectField={true}
              options={languages}
              onSelectChange={handleSelectChange}
            />

            {/* Account Information */}
            <div className="border-b pb-4 mt-6 flex items-center">
              <Globe className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Account Info</h3>
            </div>

            <ProfileField
              label="Email Address"
              value={profile.email}
              field="email"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            <ProfileField
              label="Phone Number"
              value={profile.phone}
              field="phone"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            {/* Change Password Section */}
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="w-full flex items-center justify-center gap-2 border-purple-200 dark:border-purple-800/40 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400"
              >
                <Shield className="h-4 w-4" />
                <span>Change Password</span>
              </Button>

              {showPasswordFields && (
                <div className="mt-4 space-y-4 p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900/20">
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">Current Password</Label>
                    <Input 
                      type="password" 
                      placeholder="Enter current password" 
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">New Password</Label>
                    <Input 
                      type="password" 
                      placeholder="Enter new password" 
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                    <Input 
                      type="password" 
                      placeholder="Confirm new password" 
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Update Password
                  </Button>
                </div>
              )}
            </div>          

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="outline" className="border-green-200 dark:border-green-800/40 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400">
                <a href="/contact">Help Center</a>
              </Button>
              <Button variant="destructive" className="hover:bg-red-700">Delete account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable ProfileField Component
function ProfileField({
  label,
  value,
  field,
  editingField,
  tempValue,
  onEdit,
  onChange,
  onSave,
  onCancel,
  isDateField = false,
  isSelectField = false,
  options = [],
  onDateChange,
  onSelectChange,
}: {
  label: string;
  value: string;
  field: string;
  editingField: string | null;
  tempValue: string;
  onEdit: (field: string, value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  isDateField?: boolean;
  isSelectField?: boolean;
  options?: string[];
  onDateChange?: (date: Date) => void;
  onSelectChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(field);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      <div className="flex-1">
        <Label className="text-sm text-gray-600 dark:text-gray-400">{label}</Label>
        {editingField === field ? (
          isDateField ? (
            <DatePicker
              selected={new Date(tempValue)}
              onChange={(date: Date | null) => date && onDateChange?.(date)}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          ) : isSelectField ? (
            <select
              value={tempValue}
              onChange={onSelectChange}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <Input
              value={tempValue}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          )
        ) : (
          <p className="text-gray-800 dark:text-gray-200 font-medium">{value}</p>
        )}
      </div>
      <div>
        {editingField === field ? (
          <div className="flex space-x-1">
            <Button size="icon" variant="ghost" onClick={() => onSave(field)} className="text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/20">
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onCancel} className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(field, value)}
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Edit, Check, X, Key } from "lucide-react";
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
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>

      {/* Card */}
      <div className="mt-8">
        <Card className="bg-gray-100 shadow-lg border border-gray-300">
          <CardHeader className="border-b p-6 bg-gray-200">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-medium">{profile.name}</p>
                <p className="text-sm text-gray-500">
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
                  <Button variant="outline" size="sm" className="mt-2">
                    Change photo
                  </Button>
                </Label>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Profile Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800">Profile Info</h3>
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
            <div className="border-b pb-4 mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Account Info</h3>
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
                variant="secondary"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Key className="h-4 w-4" />
                <span>Change Password</span>
              </Button>

              {showPasswordFields && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
              )}
            </div>          

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary"><a href="/contact">Help-Center</a></Button>
              <Button variant="destructive">Delete account</Button>
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
    <div className="flex justify-between items-center">
      <div>
        <Label className="text-gray-600">{label}</Label>
        {editingField === field ? (
          isDateField ? (
            <DatePicker
              selected={new Date(tempValue)}
              onChange={(date: Date | null) => date && onDateChange?.(date)}
              className="mt-1"
            />
          ) : isSelectField ? (
            <select
              value={tempValue}
              onChange={onSelectChange}
              className="mt-1 p-2 border rounded"
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
              className="mt-1"
            />
          )
        ) : (
          <p className="text-gray-800">{value}</p>
        )}
      </div>
      <div>
        {editingField === field ? (
          <>
            <Button size="icon" variant="ghost" onClick={() => onSave(field)}>
              <Check className="h-4 w-4 text-green-600" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onCancel}>
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(field, value)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
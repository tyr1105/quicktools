"use client";
import { useState, useMemo } from "react";

function decodeJWT(token: string) {
  try {
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { error: "Invalid JWT: must have 3 parts separated by dots" };
    const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return { header, payload, signature: parts[2] };
  } catch (e: any) {
    return { error: "Failed to decode: " + e.message };
  }
}

const defaultJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoder() {
  const [token, setToken] = useState(defaultJWT);
  const decoded = useMemo(() => decodeJWT(token), [token]);

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JWT Decoder</h1>
        <p className="text-gray-500">Decode and inspect JSON Web Tokens to see header and payload.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">JWT Token</label>
          <textarea className="code-input" value={token} onChange={e => setToken(e.target.value)} rows={4} placeholder="Paste your JWT token here" />
        </div>
        {"error" in decoded ? (
          <p className="text-red-500 text-sm">{decoded.error}</p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Header</label>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(decoded.header, null, 2))} className="text-xs text-brand-600 hover:underline">Copy</button>
              </div>
              <pre className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm font-mono overflow-auto">{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Payload</label>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(decoded.payload, null, 2))} className="text-xs text-brand-600 hover:underline">Copy</button>
              </div>
              <pre className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm font-mono overflow-auto">{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>
            <div>
              <label className="text-sm font-medium">Signature</label>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono break-all">{decoded.signature}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

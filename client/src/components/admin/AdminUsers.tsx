import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, User } from "lucide-react";
import { format } from "date-fns";

export function AdminUsers() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminApi.getUsers,
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading users...</div>;
  }

  const adminCount = users?.filter(u => u.isAdmin).length || 0;
  const regularCount = users?.filter(u => !u.isAdmin).length || 0;

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Registered accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}</div>
            <p className="text-xs text-muted-foreground">
              Admin accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regularCount}</div>
            <p className="text-xs text-muted-foreground">
              Standard accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {users && users.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user: any) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="text-sm font-mono text-gray-900">{user.id.slice(0, 8)}...</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{user.username}</div>
                          {user.isAdmin && <Shield className="w-4 h-4 text-blue-600" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge variant={user.isAdmin ? "default" : "secondary"}>
                          {user.isAdmin ? "Admin" : "User"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No users found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

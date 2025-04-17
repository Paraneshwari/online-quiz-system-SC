
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Download, ChevronDown } from "lucide-react";
import { useState } from "react";

// Mock student data
const students = [
  { 
    id: "s1", 
    name: "Alex Johnson", 
    email: "alex.j@example.com", 
    quizzesAssigned: 12, 
    quizzesCompleted: 10, 
    avgScore: 88,
    lastActive: "1 day ago"
  },
  { 
    id: "s2", 
    name: "Maria Garcia", 
    email: "maria.g@example.com", 
    quizzesAssigned: 12, 
    quizzesCompleted: 11, 
    avgScore: 92,
    lastActive: "3 hours ago"
  },
  { 
    id: "s3", 
    name: "James Wilson", 
    email: "james.w@example.com", 
    quizzesAssigned: 12, 
    quizzesCompleted: 8, 
    avgScore: 76,
    lastActive: "2 days ago"
  },
  { 
    id: "s4", 
    name: "Sarah Lee", 
    email: "sarah.l@example.com", 
    quizzesAssigned: 12, 
    quizzesCompleted: 12, 
    avgScore: 85,
    lastActive: "5 hours ago"
  },
  { 
    id: "s5", 
    name: "Michael Brown", 
    email: "michael.b@example.com", 
    quizzesAssigned: 12, 
    quizzesCompleted: 9, 
    avgScore: 89,
    lastActive: "1 day ago"
  },
  { 
    id: "s6", 
    name: "Emily Davis", 
    email: "emily.d@example.com", 
    quizzesAssigned: 12, 
    quizzesCompleted: 7, 
    avgScore: 72,
    lastActive: "4 days ago"
  },
  { 
    id: "s7", 
    name: "David Martinez", 
    email: "david.m@example.com", 
    quizzesAssigned: 12, 
    quizzesCompleted: 10, 
    avgScore: 81,
    lastActive: "2 days ago"
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredStudents = students.filter(
    student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track student progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Overview of all students and their progress</CardDescription>
              </div>
              <div className="flex w-full max-w-sm items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-1">
                  Filter <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Avg. Score</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-24 bg-muted rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(student.quizzesCompleted / student.quizzesAssigned) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">
                          {student.quizzesCompleted}/{student.quizzesAssigned}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{student.avgScore}%</TableCell>
                    <TableCell>{student.lastActive}</TableCell>
                    <TableCell>
                      {student.quizzesCompleted === student.quizzesAssigned ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">Complete</Badge>
                      ) : student.quizzesCompleted > student.quizzesAssigned / 2 ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary">In Progress</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Behind</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completion Status</CardTitle>
              <CardDescription>Student quiz completion overview</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Complete (all quizzes)</span>
                    <span>28%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>In Progress (50%+ complete)</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Behind (less than 50%)</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Distribution</CardTitle>
              <CardDescription>Student performance by grade range</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>90-100% (Excellent)</span>
                    <span>24%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>80-89% (Very Good)</span>
                    <span>38%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "38%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>70-79% (Good)</span>
                    <span>26%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-violet-500 h-2 rounded-full" style={{ width: "26%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Below 70% (Needs Improvement)</span>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Summary</CardTitle>
              <CardDescription>Recent student activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Quizzes completed today</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Active students (24h)</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Recent Submissions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Maria Garcia</span>
                      <span className="text-muted-foreground">3 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sarah Lee</span>
                      <span className="text-muted-foreground">5 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>James Wilson</span>
                      <span className="text-muted-foreground">yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_by: string | null
          category: Database["public"]["Enums"]["alert_category"]
          created_at: string
          entity_ref: Json
          id: string
          severity: Database["public"]["Enums"]["alert_severity"]
        }
        Insert: {
          acknowledged_by?: string | null
          category: Database["public"]["Enums"]["alert_category"]
          created_at?: string
          entity_ref: Json
          id?: string
          severity: Database["public"]["Enums"]["alert_severity"]
        }
        Update: {
          acknowledged_by?: string | null
          category?: Database["public"]["Enums"]["alert_category"]
          created_at?: string
          entity_ref?: Json
          id?: string
          severity?: Database["public"]["Enums"]["alert_severity"]
        }
        Relationships: [
          {
            foreignKeyName: "alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor: string
          after: Json | null
          before: Json | null
          entity: string
          id: string
          ts: string
        }
        Insert: {
          action: string
          actor: string
          after?: Json | null
          before?: Json | null
          entity: string
          id?: string
          ts?: string
        }
        Update: {
          action?: string
          actor?: string
          after?: Json | null
          before?: Json | null
          entity?: string
          id?: string
          ts?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_fkey"
            columns: ["actor"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      calendars: {
        Row: {
          id: string
          shifts: Json
          timezone: string
        }
        Insert: {
          id?: string
          shifts: Json
          timezone: string
        }
        Update: {
          id?: string
          shifts?: Json
          timezone?: string
        }
        Relationships: []
      }
      dispatches: {
        Row: {
          id: string
          items: Json
          machine_id: string
          shift_date: string
        }
        Insert: {
          id?: string
          items: Json
          machine_id: string
          shift_date: string
        }
        Update: {
          id?: string
          items?: Json
          machine_id?: string
          shift_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispatches_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          id: string
          payload: Json
          type: Database["public"]["Enums"]["event_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          payload: Json
          type: Database["public"]["Enums"]["event_type"]
        }
        Update: {
          created_at?: string
          id?: string
          payload?: Json
          type?: Database["public"]["Enums"]["event_type"]
        }
        Relationships: []
      }
      kpi_metrics: {
        Row: {
          breakdown: Json | null
          id: string
          name: string
          period: unknown
          value: number
        }
        Insert: {
          breakdown?: Json | null
          id?: string
          name: string
          period: unknown
          value: number
        }
        Update: {
          breakdown?: Json | null
          id?: string
          name?: string
          period?: unknown
          value?: number
        }
        Relationships: []
      }
      machines: {
        Row: {
          active: boolean
          calendar_id: string | null
          capacity_unit: string
          id: string
          maintenance_windows: unknown[]
          name: string
          type: Database["public"]["Enums"]["machine_type"]
        }
        Insert: {
          active?: boolean
          calendar_id?: string | null
          capacity_unit: string
          id?: string
          maintenance_windows?: unknown[]
          name: string
          type: Database["public"]["Enums"]["machine_type"]
        }
        Update: {
          active?: boolean
          calendar_id?: string | null
          capacity_unit?: string
          id?: string
          maintenance_windows?: unknown[]
          name?: string
          type?: Database["public"]["Enums"]["machine_type"]
        }
        Relationships: [
          {
            foreignKeyName: "machines_calendar_id_fkey"
            columns: ["calendar_id"]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: ["id"]
          },
        ]
      }
      material_status: {
        Row: {
          id: string
          note: string | null
          operation_id: string
          status: Database["public"]["Enums"]["material_ready"]
        }
        Insert: {
          id?: string
          note?: string | null
          operation_id: string
          status: Database["public"]["Enums"]["material_ready"]
        }
        Update: {
          id?: string
          note?: string | null
          operation_id?: string
          status?: Database["public"]["Enums"]["material_ready"]
        }
        Relationships: [
          {
            foreignKeyName: "material_status_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "operations"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          article: string
          eta: string | null
          id: string
          lot: string | null
          qty: number
        }
        Insert: {
          article: string
          eta?: string | null
          id?: string
          lot?: string | null
          qty: number
        }
        Update: {
          article?: string
          eta?: string | null
          id?: string
          lot?: string | null
          qty?: number
        }
        Relationships: []
      }
      operations: {
        Row: {
          ai_explain: Json | null
          ai_score: number | null
          deps: string[]
          duration_min: number | null
          end: string | null
          id: string
          machine_id: string | null
          order_id: string
          setup_group_id: string | null
          start: string | null
          state: Database["public"]["Enums"]["operation_state"]
        }
        Insert: {
          ai_explain?: Json | null
          ai_score?: number | null
          deps?: string[]
          duration_min?: number | null
          end?: string | null
          id?: string
          machine_id?: string | null
          order_id: string
          setup_group_id?: string | null
          start?: string | null
          state?: Database["public"]["Enums"]["operation_state"]
        }
        Update: {
          ai_explain?: Json | null
          ai_score?: number | null
          deps?: string[]
          duration_min?: number | null
          end?: string | null
          id?: string
          machine_id?: string | null
          order_id?: string
          setup_group_id?: string | null
          start?: string | null
          state?: Database["public"]["Enums"]["operation_state"]
        }
        Relationships: [
          {
            foreignKeyName: "operations_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operations_setup_group_id_fkey"
            columns: ["setup_group_id"]
            isOneToOne: false
            referencedRelation: "setup_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          article: string
          customer: string
          due_date: string
          erp_no: string
          id: string
          priority: number
          process_chain: string[]
          quantity: number
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          article: string
          customer: string
          due_date: string
          erp_no: string
          id?: string
          priority?: number
          process_chain: string[]
          quantity: number
          status?: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          article?: string
          customer?: string
          due_date?: string
          erp_no?: string
          id?: string
          priority?: number
          process_chain?: string[]
          quantity?: number
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: []
      }
      plan_operations: {
        Row: {
          locked: boolean
          operation_id: string
          plan_id: string
          seq_index: number
        }
        Insert: {
          locked?: boolean
          operation_id: string
          plan_id: string
          seq_index: number
        }
        Update: {
          locked?: boolean
          operation_id?: string
          plan_id?: string
          seq_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "plan_operations_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "operations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_operations_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          comment: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["plan_status"]
          version: number
        }
        Insert: {
          comment?: string | null
          id?: string
          name: string
          status: Database["public"]["Enums"]["plan_status"]
          version: number
        }
        Update: {
          comment?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["plan_status"]
          version?: number
        }
        Relationships: []
      }
      roles: {
        Row: {
          name: string
          permissions: Json
        }
        Insert: {
          name: string
          permissions: Json
        }
        Update: {
          name?: string
          permissions?: Json
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          id: string
          kpis: Json
          name: string
          snapshot_at: string
        }
        Insert: {
          id?: string
          kpis: Json
          name: string
          snapshot_at?: string
        }
        Update: {
          id?: string
          kpis?: Json
          name?: string
          snapshot_at?: string
        }
        Relationships: []
      }
      setup_groups: {
        Row: {
          attributes: Json
          change_matrix: Json
          id: string
          name: string
        }
        Insert: {
          attributes: Json
          change_matrix: Json
          id?: string
          name: string
        }
        Update: {
          attributes?: Json
          change_matrix?: Json
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      user_has_permission: {
        Args: { permission_name: string }
        Returns: boolean
      }
    }
    Enums: {
      alert_category: "due" | "material" | "capacity" | "breakdown"
      alert_severity: "info" | "warning" | "critical"
      event_type: "breakdown" | "rush" | "material_delay"
      machine_type: "gravure" | "offset" | "diecut" | "gluing"
      material_ready: "ready" | "pending" | "critical"
      operation_state:
        | "planned"
        | "scheduled"
        | "released"
        | "in_progress"
        | "paused"
        | "completed"
        | "cancelled"
      order_status: "planned" | "released" | "completed" | "cancelled"
      plan_status: "draft" | "released" | "rolled_back" | "superseded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_category: ["due", "material", "capacity", "breakdown"],
      alert_severity: ["info", "warning", "critical"],
      event_type: ["breakdown", "rush", "material_delay"],
      machine_type: ["gravure", "offset", "diecut", "gluing"],
      material_ready: ["ready", "pending", "critical"],
      operation_state: [
        "planned",
        "scheduled",
        "released",
        "in_progress",
        "paused",
        "completed",
        "cancelled",
      ],
      order_status: ["planned", "released", "completed", "cancelled"],
      plan_status: ["draft", "released", "rolled_back", "superseded"],
    },
  },
} as const

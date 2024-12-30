export const translations = {
  en: {
    help: {
      title: "Help Center",
      about: {
        title: "About Time Zone Guide",
        description: "Time Zone Guide helps remote teams collaborate effectively across different time zones. Our app makes it easy to find optimal meeting times that work for everyone, taking into account each team member's working hours and peak productivity periods."
      },
      howTo: {
        title: "How to Use",
        addMembers: {
          title: "1. Add Team Members",
          steps: [
            "Go to the \"Team Info\" page",
            "Enter the team member's name",
            "Select their time zone location",
            "Set their working hours",
            "Choose their peak productivity time",
            "Click \"Add Team Member\" to save"
          ]
        },
        viewDashboard: {
          title: "2. View Dashboard",
          steps: [
            "Navigate to the \"Dashboard\" page",
            "See all team members and their current status",
            "Check recommended meeting times",
            "Select meeting duration to find suitable slots",
            "Schedule meetings directly from recommendations"
          ]
        }
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "How do I add team members in different time zones?",
            answer: "When adding a team member, simply select their location from the time zone dropdown menu. The app will automatically handle time conversions and show their working hours in everyone's local time on the dashboard."
          },
          {
            question: "How are meeting times recommended?",
            answer: "Our app analyzes each team member's working hours and productivity peaks to suggest optimal meeting times. We prioritize times when most team members are available and at their most productive."
          },
          {
            question: "Can I integrate with my calendar?",
            answer: "Yes! When you find a suitable meeting time, click the \"Schedule\" button to add it directly to your Google Calendar or Outlook. You can also send email invitations to team members."
          }
        ]
      }
    },
    settings: {
      title: "Settings",
      language: {
        title: "Language Settings",
        label: "Display Language",
        description: "Choose the language you want to use in the application"
      },
      timezone: {
        title: "Time Zone Settings",
        label: "Time Zone",
        description: "Choose your preferred time zone for displaying dates and times",
        currentTime: "Current time:"
      },
      theme: {
        title: "Theme Settings",
        label: "Dark Mode",
        description: "Toggle between light and dark mode",
        options: {
          light: "Light",
          dark: "Dark"
        }
      }
    },
    addMember: {
      title: "Add Team Member",
      form: {
        name: {
          label: "Name",
          placeholder: "Enter member name"
        },
        location: {
          label: "Location (Time Zone)",
          placeholder: "Select time zone"
        },
        workingHours: {
          start: "Working Hours Start",
          end: "Working Hours End"
        },
        productivityPeak: {
          label: "Peak Productivity Time",
          options: {
            morning: "Morning",
            afternoon: "Afternoon",
            evening: "Evening"
          }
        },
        submit: "Add Team Member"
      }
    },
    dashboard: {
      title: "Team Dashboard",
      meetingRecommendations: {
        title: "Meeting Time Recommendations",
        duration: {
          label: "Meeting Duration",
          options: {
            "30": "30 minutes",
            "60": "1 hour",
            "90": "1.5 hours",
            "120": "2 hours"
          }
        },
        noSlots: "No suitable meeting times found for the selected duration.",
        availableMembers: "{count} team members available"
      },
      teamMembers: {
        columns: {
          name: "Name",
          location: "Location",
          workingHours: "Working Hours",
          status: "Status",
          productivityPeak: "Productivity Peak",
          actions: "Actions"
        },
        status: {
          working: "Working",
          offHours: "Off Hours"
        },
        noMembers: "No team members added yet. Add team members from the Team Info page.",
        deleteDialog: {
          title: "Delete Member",
          description: "Are you sure you want to delete {name}? This action cannot be undone.",
          cancel: "Cancel",
          confirm: "Delete"
        },
        editDialog: {
          title: "Edit Member",
          cancel: "Cancel",
          confirm: "Save Changes"
        }
      }
    }
  },
  ja: {
    help: {
      title: "ヘルプセンター",
      about: {
        title: "タイムゾーンガイドについて",
        description: "タイムゾーンガイドは、異なるタイムゾーンにいるリモートチームが効果的にコラボレーションできるようサポートします。チームメンバー全員の勤務時間と生産性のピーク時間を考慮して、最適な会議時間を簡単に見つけることができます。"
      },
      howTo: {
        title: "使い方",
        addMembers: {
          title: "1. チームメンバーの追加",
          steps: [
            "「チーム情報」ページに移動",
            "メンバーの名前を入力",
            "タイムゾーンを選択",
            "勤務時間を設定",
            "生産性が高い時間帯を選択",
            "「メンバーを追加」をクリック"
          ]
        },
        viewDashboard: {
          title: "2. ダッシュボードの確認",
          steps: [
            "「ダッシュボード」ページに移動",
            "チームメンバーの状態を確認",
            "推奨会議時間をチェック",
            "会議の長さを選択して適切な時間枠を探す",
            "推奨時間から直接会議をスケジュール"
          ]
        }
      },
      faq: {
        title: "よくある質問",
        items: [
          {
            question: "異なるタイムゾーンのメンバーをどのように追加しますか？",
            answer: "メンバー追加時に、タイムゾーンのドロップダウンメニューから場所を選択するだけです。アプリが自動的に時差を計算し、ダッシュボードでは各メンバーのローカル時間で勤務時間を表示します。"
          },
          {
            question: "会議時間はどのように推奨されますか？",
            answer: "アプリが各メンバーの勤務時間と生産性のピーク時間を分析し、最適な会議時間を提案します。多くのメンバーが参加可能で、最も生産的な時間帯を優先します。"
          },
          {
            question: "カレンダーと連携できますか？",
            answer: "はい！適切な会議時間が見つかったら、「スケジュール」ボタンをクリックしてGoogleカレンダーやOutlookに直接追加できます。メールで招待を送ることもできます。"
          }
        ]
      }
    },
    settings: {
      title: "設定",
      language: {
        title: "言語設定",
        label: "表示言語",
        description: "アプリケーションで使用する言語を選択してください"
      },
      timezone: {
        title: "タイムゾーン設定",
        label: "タイムゾーン",
        description: "日時表示に使用するタイムゾーンを選択してください",
        currentTime: "現在時刻："
      },
      theme: {
        title: "テーマ設定",
        label: "ダークモード",
        description: "ライトモードとダークモードを切り替える",
        options: {
          light: "ライト",
          dark: "ダーク"
        }
      }
    },
    addMember: {
      title: "チームメンバーを追加",
      form: {
        name: {
          label: "名前",
          placeholder: "メンバーの名前を入力"
        },
        location: {
          label: "場所（タイムゾーン）",
          placeholder: "タイムゾーンを選択"
        },
        workingHours: {
          start: "勤務開始時間",
          end: "勤務終了時間"
        },
        productivityPeak: {
          label: "生産性が高い時間帯",
          options: {
            morning: "午前",
            afternoon: "午後",
            evening: "夕方"
          }
        },
        submit: "メンバーを追加"
      }
    },
    dashboard: {
      title: "チームダッシュボード",
      meetingRecommendations: {
        title: "推奨会議時間",
        duration: {
          label: "会議時間",
          options: {
            "30": "30分",
            "60": "1時間",
            "90": "1時間30分",
            "120": "2時間"
          }
        },
        noSlots: "選択された時間では適切な会議時間が見つかりませんでした。",
        availableMembers: "参加可能なメンバー: {count}名"
      },
      teamMembers: {
        columns: {
          name: "名前",
          location: "場所",
          workingHours: "勤務時間",
          status: "状態",
          productivityPeak: "生産性のピーク",
          actions: "操作"
        },
        status: {
          working: "勤務中",
          offHours: "勤務外"
        },
        noMembers: "メンバーがまだ追加されていません。チーム情報ページからメンバーを追加してください。",
        deleteDialog: {
          title: "メンバーを削除",
          description: "{name}を削除してもよろしいですか？この操作は取り消せません。",
          cancel: "キャンセル",
          confirm: "削除"
        },
        editDialog: {
          title: "メンバーを編集",
          cancel: "キャンセル",
          confirm: "変更を保存"
        }
      }
    }
  }
} 
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '.'

const meta = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['filled', 'error', 'selected&typing', 'disabled', 'read-only', 'enabled'],
      description: 'Input 상태',
    },
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Input 크기',
    },
    filled: {
      control: 'select',
      options: ['on', 'off'],
      description: '값 입력 여부',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    showButton: {
      control: 'boolean',
      description: '버튼 표시 여부',
    },
    buttonText: {
      control: 'text',
      description: '버튼 텍스트',
    },
    onButtonClick: {
      action: 'button-clicked',
      description: '버튼 클릭 핸들러',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
  },
}

export const WithLabel: Story = {
  args: {
    label: '라벨',
    placeholder: '입력하세요',
  },
}

export const Required: Story = {
  args: {
    label: '필수 입력',
    required: true,
    placeholder: '입력하세요',
  },
}

export const Small: Story = {
  args: {
    size: 's',
    label: 'Small 크기',
    placeholder: '입력하세요',
  },
}

export const Medium: Story = {
  args: {
    size: 'm',
    label: 'Medium 크기',
    placeholder: '입력하세요',
  },
}

export const Enabled: Story = {
  args: {
    status: 'enabled',
    label: 'Enabled 상태',
    placeholder: '입력하세요',
  },
}

export const EnabledFilled: Story = {
  args: {
    status: 'enabled',
    filled: 'on',
    label: 'Enabled (값 입력됨)',
    defaultValue: '입력된 값',
  },
}

export const Filled: Story = {
  args: {
    status: 'filled',
    filled: 'on',
    label: 'Filled 상태',
    defaultValue: '입력된 값',
  },
}

export const SelectedTyping: Story = {
  args: {
    status: 'selected&typing',
    label: 'Selected & Typing 상태',
    placeholder: '입력하세요',
  },
}

export const SelectedTypingFilled: Story = {
  args: {
    status: 'selected&typing',
    filled: 'on',
    label: 'Selected & Typing (값 입력됨)',
    defaultValue: '입력된 값',
  },
}

export const Error: Story = {
  args: {
    status: 'error',
    label: '에러 상태',
    errorMessage: '에러 메시지가 표시됩니다',
    placeholder: '입력하세요',
  },
}

export const ErrorFilled: Story = {
  args: {
    status: 'error',
    filled: 'on',
    label: '에러 상태 (값 입력됨)',
    errorMessage: '에러 메시지가 표시됩니다',
    defaultValue: '잘못된 값',
  },
}

export const Disabled: Story = {
  args: {
    status: 'disabled',
    label: 'Disabled 상태',
    placeholder: '입력할 수 없습니다',
  },
}

export const ReadOnly: Story = {
  args: {
    status: 'read-only',
    label: 'Read-only 상태',
    defaultValue: '읽기 전용 값',
  },
}

export const DisabledWithButton: Story = {
  args: {
    status: 'disabled',
    label: 'Disabled 상태 + 버튼',
    showButton: true,
    buttonText: '우편번호 검색',
    placeholder: '입력할 수 없습니다',
  },
}

export const WithButton: Story = {
  args: {
    label: '버튼이 있는 Input',
    showButton: true,
    buttonText: '우편번호 검색',
    placeholder: '입력하세요',
  },
}

export const SmallWithButton: Story = {
  args: {
    size: 's',
    label: 'Small 크기 + 버튼',
    showButton: true,
    buttonText: '우편번호 검색',
    placeholder: '입력하세요',
  },
}

export const MediumWithButton: Story = {
  args: {
    size: 'm',
    label: 'Medium 크기 + 버튼',
    showButton: true,
    buttonText: '우편번호 검색',
    placeholder: '입력하세요',
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Enabled 상태</h3>
        <Input status="enabled" filled="off" label="Enabled (filled: off)" placeholder="입력하세요" />
        <Input status="enabled" filled="on" label="Enabled (filled: on)" defaultValue="입력된 값" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Filled 상태</h3>
        <Input status="filled" filled="on" label="Filled" defaultValue="입력된 값" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Selected & Typing 상태</h3>
        <Input status="selected&typing" filled="off" label="Selected & Typing (filled: off)" placeholder="입력하세요" />
        <Input status="selected&typing" filled="on" label="Selected & Typing (filled: on)" defaultValue="입력된 값" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Error 상태</h3>
        <Input status="error" filled="off" label="Error (filled: off)" errorMessage="에러 메시지" placeholder="입력하세요" />
        <Input status="error" filled="on" label="Error (filled: on)" errorMessage="에러 메시지" defaultValue="잘못된 값" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Disabled & Read-only 상태</h3>
        <Input status="disabled" label="Disabled" placeholder="입력할 수 없습니다" />
        <Input status="read-only" label="Read-only" defaultValue="읽기 전용 값" />
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Small 크기</h3>
        <Input size="s" label="Small Input" placeholder="입력하세요" />
        <Input size="s" label="Small Input (필수)" required placeholder="입력하세요" />
        <Input size="s" label="Small Input (에러)" status="error" errorMessage="에러 메시지" placeholder="입력하세요" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Medium 크기</h3>
        <Input size="m" label="Medium Input" placeholder="입력하세요" />
        <Input size="m" label="Medium Input (필수)" required placeholder="입력하세요" />
        <Input size="m" label="Medium Input (에러)" status="error" errorMessage="에러 메시지" placeholder="입력하세요" />
      </div>
    </div>
  ),
}

export const WithButtonVariants: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>버튼이 있는 Input (Small)</h3>
        <Input size="s" label="Small + 버튼" showButton placeholder="입력하세요" />
        <Input size="s" label="Small + 버튼 (필수)" showButton required placeholder="입력하세요" />
        <Input size="s" label="Small + 버튼 (에러)" showButton status="error" errorMessage="에러 메시지" placeholder="입력하세요" />
        <Input size="s" label="Small + 버튼 (Disabled)" showButton status="disabled" placeholder="입력할 수 없습니다" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>버튼이 있는 Input (Medium)</h3>
        <Input size="m" label="Medium + 버튼" showButton placeholder="입력하세요" />
        <Input size="m" label="Medium + 버튼 (필수)" showButton required placeholder="입력하세요" />
        <Input size="m" label="Medium + 버튼 (에러)" showButton status="error" errorMessage="에러 메시지" placeholder="입력하세요" />
        <Input size="m" label="Medium + 버튼 (Disabled)" showButton status="disabled" placeholder="입력할 수 없습니다" />
      </div>
    </div>
  ),
}

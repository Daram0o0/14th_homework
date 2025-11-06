import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '.'

const meta = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['submit', 'button', 'reset'],
      description: '버튼 타입',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: '버튼 variant 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 (light/dark)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
    leftIcon: {
      control: false,
      description: '왼쪽 아이콘',
    },
    rightIcon: {
      control: false,
      description: '오른쪽 아이콘',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '버튼',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 버튼',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary 버튼',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline 버튼',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small 버튼',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium 버튼',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large 버튼',
  },
}

export const LightTheme: Story = {
  args: {
    theme: 'light',
    variant: 'primary',
    children: 'Light 테마',
  },
}

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    variant: 'primary',
    children: 'Dark 테마',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled 버튼',
  },
}

export const WithLeftIcon: Story = {
  args: {
    leftIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2L12.09 7.26L18 8.27L14 12.14L14.91 18.02L10 15.77L5.09 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z"
          fill="currentColor"
        />
      </svg>
    ),
    children: '왼쪽 아이콘',
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2L12.09 7.26L18 8.27L14 12.14L14.91 18.02L10 15.77L5.09 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z"
          fill="currentColor"
        />
      </svg>
    ),
    children: '오른쪽 아이콘',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" size="small">
          Small
        </Button>
        <Button variant="primary" size="medium">
          Medium
        </Button>
        <Button variant="primary" size="large">
          Large
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" theme="light">
          Light
        </Button>
        <Button variant="primary" theme="dark">
          Dark
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </div>
    </div>
  ),
}

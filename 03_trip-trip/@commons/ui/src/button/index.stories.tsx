import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button, FormButton } from '.'
import { FieldValues, FormState } from 'react-hook-form'

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

// ============================================
// FormButton Stories
// ============================================

const formButtonMeta = {
  title: 'Commons/Components/FormButton',
  component: FormButton,
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
      description: '외부에서 직접 지정한 비활성화 상태 (formState보다 우선)',
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
    formState: {
      control: false,
      description: 'RHF의 formState (isValid를 통해 disabled 자동 계산)',
    },
  },
} satisfies Meta<typeof FormButton>

// formButtonMeta는 타입 체크를 위해 사용됨
void formButtonMeta

type FormButtonStory = StoryObj<Meta<typeof FormButton>>

// Mock formState 생성 함수
const createMockFormState = (isValid: boolean): FormState<FieldValues> => {
  return {
    isValid,
    isDirty: false,
    dirtyFields: {},
    touchedFields: {},
    validating: false,
    errors: {},
    defaultValues: undefined,
    isSubmitted: false,
    isSubmitSuccessful: false,
    submitCount: 0,
    isValidating: false,
    isSubmitting: false,
  } as FormState<FieldValues>
}

export const FormButtonDefault: FormButtonStory = {
  args: {
    children: 'FormButton',
  },
}

export const FormButtonWithValidFormState: FormButtonStory = {
  args: {
    children: '유효한 폼 (활성화)',
    formState: createMockFormState(true),
  },
}

export const FormButtonWithInvalidFormState: FormButtonStory = {
  args: {
    children: '유효하지 않은 폼 (비활성화)',
    formState: createMockFormState(false),
  },
}

export const FormButtonWithExternalDisabled: FormButtonStory = {
  args: {
    children: '외부에서 disabled 지정',
    disabled: true,
    formState: createMockFormState(true), // formState는 유효하지만 disabled가 우선
  },
}

export const FormButtonPrimary: FormButtonStory = {
  args: {
    variant: 'primary',
    children: 'Primary FormButton',
    formState: createMockFormState(true),
  },
}

export const FormButtonSecondary: FormButtonStory = {
  args: {
    variant: 'secondary',
    children: 'Secondary FormButton',
    formState: createMockFormState(true),
  },
}

export const FormButtonOutline: FormButtonStory = {
  args: {
    variant: 'outline',
    children: 'Outline FormButton',
    formState: createMockFormState(true),
  },
}

export const FormButtonSmall: FormButtonStory = {
  args: {
    size: 'small',
    children: 'Small FormButton',
    formState: createMockFormState(true),
  },
}

export const FormButtonMedium: FormButtonStory = {
  args: {
    size: 'medium',
    children: 'Medium FormButton',
    formState: createMockFormState(true),
  },
}

export const FormButtonLarge: FormButtonStory = {
  args: {
    size: 'large',
    children: 'Large FormButton',
    formState: createMockFormState(true),
  },
}

export const FormButtonLightTheme: FormButtonStory = {
  args: {
    theme: 'light',
    variant: 'primary',
    children: 'Light 테마',
    formState: createMockFormState(true),
  },
}

export const FormButtonDarkTheme: FormButtonStory = {
  args: {
    theme: 'dark',
    variant: 'primary',
    children: 'Dark 테마',
    formState: createMockFormState(true),
  },
}

export const FormButtonWithLeftIcon: FormButtonStory = {
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
    formState: createMockFormState(true),
  },
}

export const FormButtonWithRightIcon: FormButtonStory = {
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
    formState: createMockFormState(true),
  },
}

export const FormButtonAllVariants: FormButtonStory = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <FormButton variant="primary" formState={createMockFormState(true)}>
          Primary (Valid)
        </FormButton>
        <FormButton variant="secondary" formState={createMockFormState(true)}>
          Secondary (Valid)
        </FormButton>
        <FormButton variant="outline" formState={createMockFormState(true)}>
          Outline (Valid)
        </FormButton>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <FormButton variant="primary" formState={createMockFormState(false)}>
          Primary (Invalid)
        </FormButton>
        <FormButton variant="secondary" formState={createMockFormState(false)}>
          Secondary (Invalid)
        </FormButton>
        <FormButton variant="outline" formState={createMockFormState(false)}>
          Outline (Invalid)
        </FormButton>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <FormButton variant="primary" size="small" formState={createMockFormState(true)}>
          Small
        </FormButton>
        <FormButton variant="primary" size="medium" formState={createMockFormState(true)}>
          Medium
        </FormButton>
        <FormButton variant="primary" size="large" formState={createMockFormState(true)}>
          Large
        </FormButton>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <FormButton variant="primary" theme="light" formState={createMockFormState(true)}>
          Light
        </FormButton>
        <FormButton variant="primary" theme="dark" formState={createMockFormState(true)}>
          Dark
        </FormButton>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <FormButton variant="primary" disabled formState={createMockFormState(true)}>
          Disabled (외부 지정)
        </FormButton>
        <FormButton variant="outline" disabled formState={createMockFormState(true)}>
          Disabled Outline (외부 지정)
        </FormButton>
      </div>
    </div>
  ),
}

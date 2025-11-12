/**
 * Modal Stories
 * 
 * Figma 참고 노드 ID:
 * - 참고할 모든 모달 컴포넌트 노드ID: 99:15030, 99:15187, 13051:11617, 13051:11664, 13051:11634, 13051:11664, 13051:11680
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Modal } from '.'
import React from 'react'
import styles from './styles.module.css'

const meta = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={styles.portal}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'danger'],
      description: '모달 variant 타입',
    },
    actions: {
      control: 'select',
      options: ['single', 'dual'],
      description: '액션 버튼 개수',
    },
    description: {
      control: 'boolean',
      description: '설명 텍스트 표시 여부',
    },
    logo: {
      control: 'boolean',
      description: '로고 표시 여부',
    },
    illust: {
      control: 'boolean',
      description: '일러스트 표시 여부',
    },
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: '모달 크기',
    },
    dropdown: {
      control: 'boolean',
      description: '드롭다운 버튼 표시 여부',
    },
    title: {
      control: 'text',
      description: '모달 제목',
    },
    descriptionText: {
      control: 'text',
      description: '설명 텍스트',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 핸들러',
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 핸들러',
    },
    children: {
      control: false,
      description: '추가 컨텐츠',
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// 기본 스토리
export const Default: Story = {
  args: {
    title: '모달 제목',
    description: true,
    descriptionText: '이것은 기본 모달입니다.',
    variant: 'info',
    actions: 'single',
    size: 'm',
  },
}

// Info Variant
export const Info: Story = {
  args: {
    title: '정보 모달',
    description: true,
    descriptionText: '정보를 확인해주세요.',
    variant: 'info',
    actions: 'single',
    size: 'm',
  },
}

// Danger Variant
export const Danger: Story = {
  args: {
    title: '위험 모달',
    description: true,
    descriptionText: '이 작업은 되돌릴 수 없습니다.',
    variant: 'danger',
    actions: 'single',
    size: 'm',
  },
}

// Single Action
export const SingleAction: Story = {
  args: {
    title: '단일 액션 모달',
    description: true,
    descriptionText: '확인 버튼만 있는 모달입니다.',
    variant: 'info',
    actions: 'single',
    size: 'm',
  },
}

// Dual Action
export const DualAction: Story = {
  args: {
    title: '이중 액션 모달',
    description: true,
    descriptionText: '취소와 확인 버튼이 있는 모달입니다.',
    variant: 'info',
    actions: 'dual',
    size: 'm',
  },
}

// Small Size
export const SmallSize: Story = {
  args: {
    title: '작은 모달',
    description: true,
    descriptionText: '작은 크기의 모달입니다.',
    variant: 'info',
    actions: 'single',
    size: 's',
  },
}

// Medium Size
export const MediumSize: Story = {
  args: {
    title: '중간 모달',
    description: true,
    descriptionText: '중간 크기의 모달입니다.',
    variant: 'info',
    actions: 'single',
    size: 'm',
  },
}

// With Logo
export const WithLogo: Story = {
  args: {
    title: '로고가 있는 모달',
    description: true,
    descriptionText: '헤더에 로고가 표시됩니다.',
    variant: 'info',
    actions: 'single',
    size: 'm',
    logo: true,
  },
}

// With Dropdown
export const WithDropdown: Story = {
  args: {
    title: '드롭다운이 있는 모달',
    description: true,
    descriptionText: '헤더에 드롭다운 버튼이 표시됩니다.',
    variant: 'info',
    actions: 'single',
    size: 'm',
    dropdown: true,
  },
}

// With Illustration
export const WithIllustration: Story = {
  args: {
    title: '일러스트가 있는 모달',
    description: true,
    descriptionText: '본문에 일러스트가 표시됩니다.',
    variant: 'info',
    actions: 'single',
    size: 'm',
    illust: true,
  },
}

// All Features
export const AllFeatures: Story = {
  args: {
    title: '모든 기능이 있는 모달',
    description: true,
    descriptionText: '로고, 드롭다운, 일러스트, 이중 액션이 모두 포함된 모달입니다.',
    variant: 'info',
    actions: 'dual',
    size: 'm',
    logo: true,
    dropdown: true,
    illust: true,
  },
}

// Danger with Dual Action
export const DangerDualAction: Story = {
  args: {
    title: '위험 모달 (이중 액션)',
    description: true,
    descriptionText: '위험한 작업을 수행하기 전 확인하는 모달입니다.',
    variant: 'danger',
    actions: 'dual',
    size: 'm',
    confirmText: '삭제',
    cancelText: '취소',
  },
}

// Without Description
export const WithoutDescription: Story = {
  args: {
    title: '설명 없는 모달',
    variant: 'info',
    actions: 'single',
    size: 'm',
    description: false,
  },
}

// Custom Content
export const CustomContent: Story = {
  render: (args) => (
    <Modal {...args}>
      <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <p>이것은 커스텀 컨텐츠입니다.</p>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>항목 1</li>
          <li>항목 2</li>
          <li>항목 3</li>
        </ul>
      </div>
    </Modal>
  ),
  args: {
    title: '커스텀 컨텐츠 모달',
    variant: 'info',
    actions: 'single',
    size: 'm',
    description: false,
  },
}


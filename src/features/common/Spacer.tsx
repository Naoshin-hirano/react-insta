import React, { FC } from 'react'

type SpacerProps = {
  size: number;
  horizontal?: boolean;
}

/**
 * marginやpaddingの代用で縦横にspaceを空けるためのコンポーネント
 * 
 * @param {number} size 縦方向のspaceサイズ
 * @param {boolean} horizontal 水平方向にspaceを空けたいか否か
 * @returns topに少しスペースを空けるdivタグ
 */
export const Spacer: FC<SpacerProps> = ({ size, horizontal }) => {
  return (
    <div
      style={
        horizontal
          ? { width: size, height: 'auto', display: 'inline-block', flexShrink: 0 }
          : { width: 'auto', height: size, flexShrink: 0  }
      }
    />
  )
}
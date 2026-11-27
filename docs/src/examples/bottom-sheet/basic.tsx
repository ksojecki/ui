import { BottomSheet } from '@ksojecki/ui/layout';
import { Paragraph } from '@ksojecki/ui/typography';

export default function BottomSheetBasic() {
  return (
    <BottomSheet summary="3 items, 129 zł" title="Basket">
      <Paragraph>Sheet content, shown when the user expands it.</Paragraph>
    </BottomSheet>
  );
}

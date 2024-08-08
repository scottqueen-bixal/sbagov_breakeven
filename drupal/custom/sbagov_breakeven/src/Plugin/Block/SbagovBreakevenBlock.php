<?php

declare(strict_types=1);

namespace Drupal\sbagov_breakeven\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Provides a sbagov_breakeven block.
 */
#[Block(
  id: 'sbagov_breakeven',
  admin_label: new TranslatableMarkup('sbagov_breakeven'),
  category: new TranslatableMarkup('Custom'),
)]
final class SbagovBreakevenBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $build['content']['#markup'] = '<div id="sbagov-breakeven">SBA Break Even Calculator</div>';
    return $build;
  }

}

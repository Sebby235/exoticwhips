"""empty message

Revision ID: 8590a0bd9f44
Revises: 8f3f80382469
Create Date: 2023-08-28 21:54:13.970080

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8590a0bd9f44'
down_revision = '8f3f80382469'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('fk_reviews_users_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_reviews_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.drop_column('users_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('users_id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_reviews_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('fk_reviews_users_id_users', 'users', ['users_id'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###